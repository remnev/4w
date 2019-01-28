'use strict';
// TODO: test
const keystone = require('keystone');
const Promise = require('bluebird');
const _ = require('lodash');
const builder = require('xmlbuilder');
const moment = require('moment');
const url = require('url');
const selectedFields = [
    'slug',
    'articles',
    'baseDiscount',
    'yandexMarketPicture',
    'yandexMarketStore',
    'yandexMarketPickup',
    'yandexMarketDelivery',
    'deliveryOptions',
    'name',
    'yandexMarketDescription',
    'yandexMarketSalesNotes',
    'yandexMarketParams',
];

module.exports = function(req, res) {
    Promise.props({
        yandexMarketInfo: keystone.list('YandexMarketInfo').model
            .findOne()
            .select('name company url deliveryOptions')
            .exec(),
        offers: keystone.list('Product').model
            .find({
                exportToYandexMarket: true,
                state: 'published',
             })
            .select(selectedFields.join(' '))
            .populate('articles')
            .exec(),
    })
        .done(function(data) {
            const xml = getXml(data);

            res
                .set('Content-Type', 'text/xml')
                .send(xml);
        });

    /**
     * Takes an xml-string
     *
     * @param  {Object} data
     * @return {String}
     */
    function getXml(data) {
        const categories = [
            'Все товары',
            'Дом и дача',
            'Строительство и ремонт',
            'Двери, окна, элементы домов',
            'Аксессуары для окон и дверей',
        ];
        const now = moment().format('YYYY-MM-DD HH:mm');
        const xml = builder
            .create('yml_catalog', {encoding: 'UTF-8'})
                .attribute('date', now)
            .element({
                shop: {
                    'name': data.yandexMarketInfo.name,
                    'company': data.yandexMarketInfo.company,
                    'url': data.yandexMarketInfo.url,
                    'currencies': [
                        {
                            currency: {
                                '@id': 'RUR',
                                '@rate': 1,
                            },
                        },
                    ],
                    'categories': {
                        category: categories.map((text, id) => ({
                            '@id': id + 1,
                            '@parentId': id,
                            '#text': text,
                        })),
                    },
                    'delivery-options': {
                        option: {
                            '@cost': data.yandexMarketInfo.deliveryOptions.cost,
                            '@days': data.yandexMarketInfo.deliveryOptions.days,
                        },
                    },
                    'offers': {
                        offer: _.flatten(data.offers.map(getOffer)),
                    },
                },
            })
            .end({
                pretty: true,
                indent: '  ',
                newline: '\n',
            });

        return xml;
    }

    /**
     * Возвращает массив предложений для каждого артикула внутри продукта
     *
     * @param  {Object} productData Данные продукта
     * @return {Array}              Массив предложений для продукта
     */
    function getOffer(productData) {
        return productData.articles.map((article) => {
            const offer = {
                '@id': article.name.toLowerCase(),
                'name': `${productData.name} ${article.size.value}${article.size.units}`,
                'url': url.format({
                    protocol: 'http',
                    hostname: '4window.ru',
                    pathname: `/products/${productData.slug}/`,
                    query: {size: article.size.value},
                }),
                'price': article.price.pure,
                'currencyId': 'RUR',
                'categoryId': 5,
                'picture': productData.yandexMarketPicture.pure.url,
                'delivery': productData.yandexMarketDelivery,
                'delivery-options': {
                    option: {
                        '@cost': productData.deliveryOptions.cost,
                        '@days': productData.deliveryOptions.days.available,
                    },
                },
                'pickup': productData.yandexMarketPickup,
                'store': productData.yandexMarketStore,
                'description': {'#cdata': productData.yandexMarketDescription},
                'sales_notes': productData.yandexMarketSalesNotes, // eslint-disable-line camelcase
                'param': _.map(productData.yandexMarketParams.toObject(), ({name, value}) => ({
                    '@name': name,
                    '#text': value,
                })),
                'weight': article.weight,
                'dimensions': article.dimensions,
            };

            if (productData.baseDiscount.pure) {
                const price = offer.price;

                offer.price = Math.floor(price - price * .01 * productData.baseDiscount.pure);
                offer.oldprice = price;
            }

            return offer;
        });
    }
};
