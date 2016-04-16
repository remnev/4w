'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var Promise = require('bluebird');
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};

    Promise.props({
        baseInfo: keystone.list('BaseInfo').model
            .findOne()
            .select('company logo mainMenu')
            .populate('mainMenu')
            .exec(),
        page: keystone.list('PageIndex').model
            .findOne()
            .select('title seo')
            .exec(),
        products: keystone.list('Product').model
            .find({state: 'published'})
            .select('name slug photos type')
            .sort('sortWeight')
            .exec()
    })
        .done(function (data) {
            locals.baseInfo = data.baseInfo;
            locals.page = data.page;
            locals.products = {
                prof: {
                    title: 'Товары для профессионалов',
                    items: data.products
                        .filter(function (product) {
                            return product.type === 'prof';
                        })
                        .map(getProductData)
                },
                home: {
                    title: 'Товары для дома',
                    items: data.products
                        .filter(function (product) {
                            return product.type === 'home';
                        })
                        .map(getProductData)
                }
            };

            view.render(bundleName);
        });

    function getProductData(product) {
        return {
            title: product.name,
            slug: product.slug,
            photo: product.photos[0].url
        };
    }
};
