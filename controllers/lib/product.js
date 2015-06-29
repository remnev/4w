'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var f = require('util').format;
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;
    var colors;

    var products = [
        require('../mock-data/flat-strips-on-roll'),
        require('../mock-data/decorative-window-bars'),
        require('../mock-data/angles'),
        require('../mock-data/pens')
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

    colors = [
        {
            code: 1192001,
            name: 'Орегон 4',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 137905,
            name: 'Кремово-белый',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 161707,
            name: 'Серебро',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 161807,
            name: 'Серебрянное облако металлик',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 2052089,
            name: 'Темный дуб',
            type: 'texture',
            isMainColor: true,
            isLaminate: true
        },
        {
            code: 2052090,
            name: 'Светлый дуб',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 2065021,
            name: 'Махагон сапели',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 2097013,
            name: 'Махагон',
            type: 'texture',
            isMainColor: true,
            isLaminate: true
        },
        {
            code: 2140006,
            name: 'Темный дуб',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 2178001,
            name: 'Золотой дуб',
            type: 'texture',
            isMainColor: true,
            isLaminate: true
        },
        {
            code: 2178007,
            name: 'Золотой орех',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 2222004,
            name: 'Табаско тик',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 300505,
            name: 'Винно-красный',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3069041,
            name: 'Горная сосна',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 308105,
            name: 'Темно-красный',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 3118076,
            name: 'Натуральный дуб',
            type: 'texture',
            isMainColor: true,
            isLaminate: true
        },
        {
            code: 3149008,
            name: 'Рустикальный дуб',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3152009,
            name: 'Полосатый дуглас',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3156003,
            name: 'Светлый дуб',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3162002,
            name: 'Макоре',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3167004,
            name: 'Мореный дуб',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3202001,
            name: 'Черная вишня',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3211005,
            name: 'Ирландский дуб',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 3241002,
            name: 'Антик',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 49197,
            name: 'Шогун АС',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 49198,
            name: 'Шогун АF',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 49195,
            name: 'Шогун AD',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 49237,
            name: 'Сиена ноче',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 500705,
            name: 'Бриллиантово-синий',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 515005,
            name: 'Стальной синий',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 600505,
            name: 'Зеленый мох',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 612505,
            name: 'Темно-зеленый',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 700405,
            name: 'Сигнальный-серый',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 701205,
            name: 'Базальтово-серый',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 701605,
            name: 'Антрацитово-серый',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 703805,
            name: 'Агатовый серый',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 715505,
            name: 'Серый',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 725105,
            name: 'Светло-серый',
            type: 'texture',
            isLaminate: true
        },
        {
            code: 809905,
            name: 'Коричневый каштан',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 851805,
            name: 'Черно-коричневый',
            type: 'monoton',
            isLaminate: true
        },
        {
            code: 887505,
            name: 'Шоколадно-коричневый',
            type: 'monoton',
            isMainColor: true,
            isLaminate: true
        }
    ];

    locals.colors = {
        main: [],
        other: []
    };

    colors.forEach(function (color) {
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
