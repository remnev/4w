'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

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

    locals.contacts = {
        phone: ' 8 (495) 134-74-47',
        operationTime: 'ежедневно с 9 до 20'
    };

    locals.logo = {
        name: '4window',
        title: 'магазин оконных принадлежностей'
    };

    locals.products = {
        prof: {
            title: 'Товары для профессионалов',
            items: [
                {
                    title: 'Нащельники',
                    slug: 'naschelnik',
                    photo: '/public/images/products/naschelnik.jpg'
                },
                {
                    title: 'Фальш-переплеты',
                    slug: 'faslh-pereplet',
                    photo: '/public/images/products/faslh-pereplet.jpg'
                },
                {
                    title: 'Уголки',
                    slug: 'ugolok',
                    photo: '/public/images/products/ugolok.jpg'
                }
            ]
        },
        home: {
            title: 'Товары для дома',
            items: [
                {
                    title: 'Чистящие средства',
                    slug: 'chist-sredstvo',
                    photo: '/public/images/products/chist-sredstvo.jpg'
                },
                {
                    title: 'Щетки',
                    slug: 'schetki',
                    photo: '/public/images/products/schetki.jpg'
                }
            ]
        }
    };

    view.render(bundleName);
};
