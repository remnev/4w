'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var f = require('util').format;
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    var products = [
        {
            slug: 'flat-strips',
            name: 'Нащельники'
        },
        {
            slug: 'decorative-window-bars',
            name: 'Фальш-переплеты'
        },
        {
            slug: 'angles',
            name: 'Уголки'
        },
        {
            slug: 'profiles',
            name: 'Профили'
        },
        {
            slug: 'pens',
            name: 'Карандаши'
        }
    ];

    var currentProduct = locals.currentProduct = getCurrentProduct();

    if (!currentProduct) {
        res.send(404);
        return;
    }

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};

    locals.mainMenu = [
        {
            title: 'Продукция',
            url: '/products/'
        },
        {
            title: 'Доставка',
            url: '/delivery/'
        },
        {
            title: 'Контакты',
            url: '/contacts/'
        }
    ];

    locals.company = {
        phone: '8 (495) 780-23-44'
    };

    locals.breadcrumbs = [
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
    ];

    locals.productsMenu = [
        {
            name: 'Для профессионалов',
            slug: 'prof',
            links: [
                {
                    slug: 'flat-strips',
                    name: 'Нащельники'
                },
                {
                    slug: 'decorative-window-bars',
                    name: 'Фальш-переплеты'
                },
                {
                    slug: 'angles',
                    name: 'Уголки'
                },
                {
                    slug: 'profiles',
                    name: 'Профили'
                },
                {
                    slug: 'pens',
                    name: 'Карандаши'
                }
            ]
        },
        {
            name: 'Для дома',
            slug: 'home',
            links: [
                {
                    slug: 'brushes',
                    name: 'Щетки'
                },
                {
                    slug: 'cleaners',
                    name: 'Чистящие средства'
                }
            ]
        }
    ];

    view.render(bundleName);

    function getCurrentProduct() {
        return products.filter(function (product) {
            return product.slug === req.params.productSlug;
        })[0];
    }
};
