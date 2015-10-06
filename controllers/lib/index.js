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

    locals.seo = {
        title: 'Магазин оконных принадлежностей — 4window',
        description: [
            'В магазине 4window вы можете купить все виды оконных принадлежностей: нащельник, фальш-переплет, уголки, ',
            'карандаши и средства для ухода за окнами. Высокое качество, удобный интерфейс и низкие цены.'
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

    locals.contacts = {
        phone: ' 8 (495) 981-96-02',
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
                    title: 'Нащельник в рулоне',
                    slug: 'flat-strips-on-roll',
                    photo: '/public/images/products/naschelnik.jpg'
                },
                {
                    title: 'Фальш-переплет в хлыстах',
                    slug: 'decorative-window-bars',
                    photo: '/public/images/products/faslh-pereplet.jpg'
                },
                {
                    title: 'Уголок в рулоне',
                    slug: 'angles',
                    photo: '/public/images/products/ugolok.jpg'
                },
                {
                    title: 'Карандаши',
                    slug: 'pens',
                    photo: '/public/images/products/pens.jpg'
                }
            ]
        },
        home: {
            title: 'Товары для дома',
            items: [
                {
                    title: 'Оконные ручки с ключом',
                    slug: 'handles-with-key',
                    photo: '/public/images/products/handles-with-key/1-for-main-page.jpg'
                },
                {
                    title: 'Набор для ухода за окнами',
                    slug: 'cleaning-kit',
                    photo: '/public/images/products/cleaning-kit/1-for-main-page.jpg'
                }
            ]
        }
    };

    view.render(bundleName);
};
