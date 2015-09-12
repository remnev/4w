'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var f = require('util').format;
var _ = require('lodash');
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var colors;

    var products = [
        require('../mock-data/flat-strips-on-roll'),
        require('../mock-data/decorative-window-bars'),
        require('../mock-data/angles'),
        require('../mock-data/pens'),
        require('../mock-data/handles-with-key')
    ];

    var currentProduct = locals.currentProduct = getCurrentProduct();

    if (!currentProduct) {
        res.send(404);
        return;
    }

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};

    locals.seo = {
        title: currentProduct.name + ' — цены, цвета, описание, купить в магазине 4window',
        description: [
            currentProduct.name + ': описание, фото, цвета, рамеры. Легко заказать на сайте или по телефону. ',
            'Бесплатный самовывоз или выгодная доставка.'
        ].join('')
    };

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
        phone: '8 (495) 134-74-47'
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
                    slug: 'flat-strips-on-roll',
                    name: 'Нащельник в рулоне'
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
                    slug: 'handles-with-key',
                    name: 'Оконные ручки с ключом'
                },
                {
                    slug: 'cleaners',
                    name: 'Чистящие средства'
                }
            ]
        }
    ];

    colors = require('../mock-data/colors')
        .filter(function (color) {
            return _.includes(currentProduct.colors, color.code);
        });

    locals.colors = {
        main: [],
        noLaminate: [],
        other: []
    };

    colors.forEach(function (color) {
        if (!color.isLaminate) {
            locals.colors.noLaminate.push(color);
            return;
        }

        if (color.isMainColor) {
            locals.colors.main.push(color);
            return;
        }

        locals.colors.other.push(color);
    });

    view.render(bundleName);

    function getCurrentProduct() {
        return products.filter(function (product) {
            return product.slug === req.params.productSlug;
        })[0];
    }
};
