'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var Promise = require('bluebird');
var _ = require('lodash');
var builder = require('xmlbuilder');
var moment = require('moment');
var url = require('url');
var f = require('util').format;
var selectedFields = [
    'slug',
    'articles',
    'discountPure',
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
    'yandexMarketParams'
];

module.exports = function (req, res) {
    Promise.props({
        yandexMarketInfo: keystone.list('YandexMarketInfo').model
            .findOne()
            .select('name company url deliveryOptions')
            .exec(),
        offers: keystone.list('Product').model
            .find({exportToYandexMarket: true})
            .select(selectedFields.join(' '))
            .populate('articles')
            .exec()
    })
        .done(function (data) {
            var xml = getXml(data);

            res
                .set('Content-Type', 'text/xml')
                .send(xml);
        });

    function getXml(data) {
        var now = moment().format('YYYY-MM-DD HH:mm');
        var xml = builder
            .create('yml_catalog', {encoding: 'UTF-8'})
                .attribute('date', now)
            .element({
                shop: {
                    name: data.yandexMarketInfo.name,
                    company: data.yandexMarketInfo.company,
                    url: data.yandexMarketInfo.url,
                    currencies: [
                        {
                            currency: {
                                '@id': 'RUR',
                                '@rate': 1
                            }
                        }
                    ],
                    categories: {
                        category: [
                            {
                                '@id': 1,
                                '#text': 'Для профессионалов'
                            },
                            {
                                '@id': 2,
                                '#text': 'Для дома'
                            }
                        ]
                    },
                    'delivery-options': {
                        option: {
                            '@cost': data.yandexMarketInfo.deliveryOptions.cost,
                            '@days': data.yandexMarketInfo.deliveryOptions.days
                        }
                    },
                    offers: {
                        offer: _.flatten(data.offers.map(getOffer))
                    }
                }
            })
            .end({
                pretty: true,
                indent: '  ',
                newline: '\n'
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
        return productData.articles.map(function (articleData) {
            return _.map(articleData.price.toObject(), function (priceVal, priceKey) {
                var price = articleData.price[priceKey];
                var offer = {
                    '@type': 'vendor.model',
                    '@id': articleData.name.toLowerCase() + priceKey[0],
                    '@available': true,
                    url: url.format({
                        protocol: 'http',
                        hostname: '4window.ru',
                        pathname: f('/products/%s/', productData.slug),
                        query: {
                            type: priceKey,
                            size: articleData.size.value
                        }
                    }),
                    currencyId: 'RUR',
                    categoryId: productData.type === 'prof' ? 1 : 2,
                    market_category: productData.yandexMarketCategory, // eslint-disable-line camelcase
                    picture: productData.yandexMarketPicture[priceKey].url,
                    store: productData.yandexMarketStore,
                    pickup: productData.yandexMarketPickup,
                    delivery: productData.yandexMarketDelivery,
                    'delivery-options': {
                        option: {
                            '@cost': productData.deliveryOptions.cost,
                            '@days': productData.deliveryOptions.days.available
                        }
                    },
                    typePrefix: productData.name,
                    vendor: productData.vendor,
                    model: f('%s %s%s',
                        priceKey === 'pure' ? 'Белый ПВХ' : 'Ламинированный',
                        articleData.size.value,
                        articleData.size.units),
                    description: productData.yandexMarketDescription.slice(0, 175),
                    sales_notes: productData.yandexMarketSalesNotes, // eslint-disable-line camelcase
                    weight: articleData.weight,
                    dimensions: articleData.dimensions,
                    param: _.map(productData.yandexMarketParams.toObject(), function (paramVal) {
                        return {
                            '@name': paramVal.name,
                            '#text': paramVal.value
                        };
                    })
                };

                if (priceKey === 'pure' && productData.discountPure) {
                    offer.price = price - price * .01 * productData.discountPure;
                    offer.oldprice = price;
                } else {
                    offer.price = price;
                }

                return offer;
            });
        });
    }
};
