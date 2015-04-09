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
        {
            slug: 'flat-strips-on-roll',
            name: 'Нащельник в рулоне',
            description: [
                'В рулоне 50 м. Материал ПВХ (твердый и мягкий). Самоклеящаяся пенообразная клейкая лента.',
                'Примененяется для внутренней и внешней отделки окон, лоджий, дверей. Гарантированное приклеивание к',
                'поверхности ПВХ до -15С.'
            ].join(' '),
            articles: [
                {
                    name: 'FLR20LK',
                    price: {
                        pure: 20,
                        laminate: 35
                    },
                    size: {
                        units: 'мм',
                        value: '20'
                    }
                },
                {
                    name: 'FLR30LK',
                    price: {
                        pure: 30,
                        laminate: 45
                    },
                    size: {
                        units: 'мм',
                        value: '30'
                    }
                },
                {
                    name: 'FLR40LK',
                    price: {
                        pure: 35,
                        laminate: 40
                    },
                    size: {
                        units: 'мм',
                        value: '40'
                    }
                },
                {
                    name: 'FLR50LK',
                    price: {
                        pure: 40,
                        laminate: 48
                    },
                    size: {
                        units: 'мм',
                        value: '50'
                    }
                },
                {
                    name: 'FLR60LK',
                    price: {
                        pure: 42,
                        laminate: 50
                    },
                    size: {
                        units: 'мм',
                        value: '60'
                    }
                },
                {
                    name: 'FLR70LK',
                    price: {
                        pure: 50,
                        laminate: 60
                    },
                    size: {
                        units: 'мм',
                        value: '70'
                    }
                },
                {
                    name: 'FLR80LK',
                    price: {
                        pure: 55,
                        laminate: 58
                    },
                    size: {
                        units: 'мм',
                        value: '80'
                    }
                },
                {
                    name: 'FLR90LK',
                    price: {
                        pure: 64,
                        laminate: 70
                    },
                    size: {
                        units: 'мм',
                        value: '90'
                    }
                },
                {
                    name: 'FLR100LK',
                    price: {
                        pure: 70,
                        laminate: 80
                    },
                    size: {
                        units: 'мм',
                        value: '100'
                    }
                }
            ],
            aboutProduct: [
                '<h2>Что такое нащельник</h2><p>Нащельник — это самоклеящийся пластиковый профиль, закрывающий',
                'монтажный шов между оконной рамой и стеной оконного проема.</p>',
                '<h3>Нащельник решает следующие задачи:</h3>',
                '<ol><li>Скрывает монтажные швы и полости;</li>',
                '<li>Защищает монтажную пену внутри шва от влаги и солнечных лучей.</li></ol>',
                '<p>С внутренней стороны профиля находится пенообразная клейкая лента для приклеивания к поверхности.',
                'Мы предлагаем нащельник в рулонах длиной 50 метров. Вы можете выбрать любую ширину профиля от 20 до',
                '100 мм. Так же вы можете выбрать любой цвет из палитры Renolit.</p>'
            ].join(' '),
            photos: [
                '/public/images/products/flat-strips-on-roll/1.jpg',
                '/public/images/products/flat-strips-on-roll/2.jpg',
                '/public/images/products/flat-strips-on-roll/3.jpg'
            ]
        },
        {
            slug: 'decorative-window-bars',
            name: 'Фальш-переплеты',
            article: 'G%d',
            description: ['В одной упаковке 12 пятиметровых хлыстов. Материал ПВХ (твердый и мягкий).',
                'Самоклеящаяся пенообразная клейкая лента. Наклеивается непосредственно на стеклопакет.'
            ].join(' '),
            articles: [
                {
                    name: 'G27',
                    price: {
                        pure: 20,
                        laminate: 35
                    },
                    size: {
                        units: 'мм',
                        value: '27x8'
                    }
                },
                {
                    name: 'G47',
                    price: {
                        pure: 40,
                        laminate: 55
                    },
                    size: {
                        units: 'мм',
                        value: '47x8'
                    }
                },
                {
                    name: 'G77',
                    price: {
                        pure: 50,
                        laminate: 55
                    },
                    size: {
                        units: 'мм',
                        value: '77x8'
                    }
                },
                {
                    name: 'G2610',
                    price: {
                        pure: 60,
                        laminate: 65
                    },
                    size: {
                        units: 'мм',
                        value: '26x10'
                    }
                }
            ],
            aboutProduct: ''
        },
        {
            slug: 'angles',
            name: 'Уголки',
            description: ['В рулоне 50 м. Материал ПВХ (твердый или твердый и мягкий). Самоклеящаяся пенообразная',
                'клейкая лента.',
                'Примененяется для внутренней и внешней отделки окон, лоджий, дверей. Гарантированное приклеивание к'
            ].join(' '),
            articles: [
                {
                    name: 'WKL15',
                    price: {
                        pure: 20,
                        laminate: 35
                    },
                    size: {
                        units: 'мм',
                        value: '15x15'
                    }
                },
                {
                    name: 'WKL25',
                    price: {
                        pure: 30,
                        laminate: 35
                    },
                    size: {
                        units: 'мм',
                        value: '25x25'
                    }
                },
                {
                    name: 'WKL30',
                    price: {
                        pure: 38,
                        laminate: 42
                    },
                    size: {
                        units: 'мм',
                        value: '30x30'
                    }
                },
                {
                    name: 'WKL40',
                    price: {
                        pure: 45,
                        laminate: 50
                    },
                    size: {
                        units: 'мм',
                        value: '40x20'
                    }
                },
                {
                    name: 'WKL35',
                    price: {
                        pure: 50,
                        laminate: 55
                    },
                    size: {
                        units: 'мм',
                        value: '35x35'
                    }
                }
            ],
            aboutProduct: ''
        },
        {
            slug: 'pens',
            name: 'Карандаши',
            description: ['Внутри пигментный лак на акриловой основе. Используется для внутренних и внешних работ.',
                'Наносится на пластиковые, деревянные и металлические поверхности. Быстро высыхает,',
                'устойчив к ультрафиолетовому излучению, водонепроницаем.'
            ].join(' '),
            articles: [
                {
                    name: 'KFP',
                    price: {
                        pure: 200,
                        laminate: 200
                    },
                    size: null
                }
            ],
            aboutProduct: ''
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
