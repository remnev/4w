'use strict';
// TODO: test
const keystone = require('keystone');
const Promise = require('bluebird');
const _ = require('lodash');
const builder = require('xmlbuilder');
const moment = require('moment');
const url = require('url');
const f = require('util').format;
const selectedFields = [
    'slug',
    'articles',
    'baseDiscount',
    'numberDiscount',
    'type',
    'yandexMarketCategory',
    'yandexMarketPicture',
    'yandexMarketStore',
    'yandexMarketPickup',
    'yandexMarketDelivery',
    'deliveryOptions',
    'name',
    'vendor',
    'yandexMarketDescription',
    'yandexMarketSalesNotes',
    'yandexMarketParams',
    'colors',
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
                state: 'published'
             })
            .select(selectedFields.join(' '))
            .populate('articles colors.available colors.onRequest')
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
                        category: [
                            {
                                '@id': 1,
                                '#text': 'Для профессионалов',
                            },
                            {
                                '@id': 2,
                                '#text': 'Для дома',
                            },
                        ],
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
        productData.colors.available.push({
            title: 'Белый ПВХ',
            isPure: true,
            code: 0,
        });

        return productData.articles.map(function(articleData) {
            const offersByColors = [
                productData.colors.available.map(getOfferByColor.bind(this, 'available')),
            ];

            if (productData.colors.onRequest.length) {
                offersByColors.push(productData.colors.onRequest.map(getOfferByColor.bind(this, 'onRequest')));
            }

            return offersByColors;

            /**
             * Takes an offer node representation depending on its color type
             *
             * @param  {String} availability
             * @param  {Object} color
             * @return {Object}
             */
            function getOfferByColor(availability, color) {
                let offer;
                const colorType = color.isPure ? 'pure' : 'laminate';
                const price = articleData.price[colorType];
                const description = f('Размер %s %s. %s',
                    articleData.size.value || 'n/a',
                    articleData.size.units,
                    productData.yandexMarketDescription.slice(0, 150));
                let model = f('Белый ПВХ %s%s', articleData.size.value, articleData.size.units);
                const query = {
                    'color-type': colorType,
                    'size': articleData.size.value,
                };

                if (!color.isPure) {
                    query.color = color.code;

                    model = f('Ламинированный %s%s "%s"', articleData.size.value, articleData.size.units, color.title);
                }

                offer = {
                    '@type': 'vendor.model',
                    '@id': f('%s%s%s', articleData.name.toLowerCase(), colorType[0], color.code),
                    '@available': availability === 'available',
                    'url': url.format({
                        protocol: 'http',
                        hostname: '4window.ru',
                        pathname: f('/products/%s/', productData.slug),
                        query: query,
                    }),
                    'currencyId': 'RUR',
                    'categoryId': productData.type === 'prof' ? 1 : 2,
                    'market_category': productData.yandexMarketCategory, // eslint-disable-line camelcase
                    'picture': productData.yandexMarketPicture[colorType].url,
                    'store': productData.yandexMarketStore,
                    'pickup': productData.yandexMarketPickup,
                    'delivery': productData.yandexMarketDelivery,
                    'delivery-options': {
                        option: {
                            '@cost': productData.deliveryOptions.cost,
                            '@days': productData.deliveryOptions.days[availability],
                        },
                    },
                    'typePrefix': productData.name,
                    'vendor': productData.vendor,
                    'model': model,
                    'description': description,
                    'sales_notes': productData.yandexMarketSalesNotes, // eslint-disable-line camelcase
                    'weight': articleData.weight,
                    'dimensions': articleData.dimensions,
                    'param': _.map(productData.yandexMarketParams.toObject(), function(paramVal) {
                        return {
                            '@name': paramVal.name,
                            '#text': paramVal.value,
                        };
                    }),
                };

                if (productData.baseDiscount[colorType]) {
                    offer.price = Math.floor(price - price * .01 * productData.baseDiscount[colorType]);
                    offer.oldprice = price;
                } else {
                    offer.price = price;
                }

                return offer;
            }
        });
    }
};
