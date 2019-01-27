'use strict';
// TODO: test
const keystone = require('keystone');
const f = require('util').format;
const _ = require('lodash');
const Promise = require('bluebird');
const bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function(req, res) {
    const view = new keystone.View(req, res);
    const locals = res.locals;
    const selectedFields = [
        'slug',
        'name',
        'coating',
        'articles',
        'colorsRenolit',
        'description',
        'aboutProduct',
        'photos',
        'showPriceTable',
        'type',
        'baseDiscount',
        'numberDiscount',
        'deliveryOptions',
        'valueForPrice',
    ];

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'}; // todo: перенести в мидлварь
    locals.query = req.query;
    locals.pathParams = req.params;
    locals.colorsRal = require('ral-to-hex/colours');

    Promise.resolve(
        keystone.list('Product').model
            .find({state: 'published'})
            .select(selectedFields.join(' '))
            .populate('colorsRenolit.available articles coating')
            .sort('sortWeight')
            .exec()
    )
        .then(function(products) {
            const currentProduct = products.filter(function(product) {
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
                colorsRenolit: keystone.list('RenolitColor').model
                    .find()
                    .select('code title')
                    .sort('code')
                    .exec(),
                productData: currentProduct,
                products: products,
                breadcrumbs: [
                    {
                        title: 'Главная',
                        url: '/',
                    },
                    {
                        title: 'Каталог продукции',
                        url: '/products/',
                    },
                    {
                        title: currentProduct.name,
                        url: f('/products/%s/', currentProduct.slug),
                    },
                ],
                productsMenu: [
                    {
                        name: 'Для профессионалов',
                        slug: 'prof',
                        links: products.filter(function(product) {
                            return product.type === 'prof';
                        }),
                    },
                    {
                        name: 'Для дома',
                        slug: 'home',
                        links: products.filter(function(product) {
                            return product.type === 'home';
                        }),
                    },
                ],
            });
        })
        .done(
            function(data) {
                _.assign(locals, data);

                view.render(bundleName);
            },
            function(err) {
                res
                    .status(err.message === 'not found' ? 404 : 500)
                    .send(err.message);
            }
        );
};
