'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var f = require('util').format;
var _ = require('lodash');
var Promise = require('bluebird');
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var selectedFields = [
        'slug',
        'name',
        'articles',
        'showPurePVC',
        'colors',
        'description',
        'aboutProduct',
        'photos',
        'showPriceTable',
        'type',
        'baseDiscount',
        'numberDiscount',
        'deliveryOptions',
        'valueForPrice'
    ];

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'}; // todo: перенести в мидлварь
    locals.query = req.query;

    Promise.resolve(
        keystone.list('Product').model
            .find({state: 'published'})
            .select(selectedFields.join(' '))
            .populate('colors.available colors.onRequest articles')
            .sort('sortWeight')
            .exec()
    )
        .then(function (products) {
            var currentProduct = products.filter(function (product) {
                return product.slug === req.params.productSlug;
            })[0];

            if (!currentProduct) {
                throw new Error('not found');
            }

            return Promise.props({
                baseInfo: keystone.list('BaseInfo').model
                    .findOne()
                    .select('company logo mainMenu')
                    .populate('mainMenu')
                    .exec(),
                page: keystone.list('PageProduct').model
                    .findOne({slug: req.params.productSlug})
                    .select('seo')
                    .exec(),
                productData: currentProduct,
                products: products,
                breadcrumbs: [
                    {
                        title: 'Главная',
                        url: '/'
                    },
                    {
                        title: 'Каталог продукции',
                        url: '/products/'
                    },
                    {
                        title: currentProduct.name,
                        url: f('/products/%s/', currentProduct.slug)
                    }
                ],
                productsMenu: [
                    {
                        name: 'Для профессионалов',
                        slug: 'prof',
                        links: products.filter(function (product) {
                            return product.type === 'prof';
                        })
                    },
                    {
                        name: 'Для дома',
                        slug: 'home',
                        links: products.filter(function (product) {
                            return product.type === 'home';
                        })
                    }
                ]
            });
        })
        .done(
            function (data) {
                _.assign(locals, data);

                view.render(bundleName);
            },
            function (err) {
                res
                    .status(err.message === 'not found' ? 404 : 500)
                    .send(err.message);
            }
        );
};
