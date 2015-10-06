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
        title: 'Варианты доставки — магазин 4window',
        description:
            'Магазин оконных принадлежностей 4window предлагает доставку по всей России. Так же предусмотрен самовывоз.'
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
        phone: ' 8 (495) 981-96-02'
    };

    locals.logo = {
        name: '4window',
        title: 'магазин оконных принадлежностей'
    };

    locals.breadcrumbs = [
        {
            title: 'Главная',
            url: '/'
        },
        {
            title: 'Доставка',
            url: '/delivery/'
        }
    ];

    locals.description = [
        '<h3>Доставка по Москве</h3>',
        'Доставка осуществляется в течение 2-3 дней после оформления заказа, если товар есть в наличии на складе.</br>',
        'Стоимость доставки в пределах МКАД – 500 руб. От МКАД до ММК – 1000 руб.</br>',
        'При заказе от 30 000 рублей заказ доставляется бесплатно.</br>',

        '<h3>Самовывоз</h3>',
        'Вы можете самостоятельно забрать товар в рабочие дни по адресу г. Москва, ул. Монтажная д. 7 стр. 1 ',
        '(м. Щелковская). Подробнее на <a href="/contacts">странице контактов</a>.</br>',
        '<b>Выдача заказов:</b></br>',
        'Понедельник-четверг 9:00 – 17:00</br>',
        'Пятница 9:00 – 16:00</br>',
        'Суббота, воскресенье – выходные</br>',

        '<h3>Доставка в регионы РФ</h3>',
        'В регионы доставка осуществляется транспортными компаниями. Стоимость доставки оплачивает заказчик. ',
        'Предварительный расчет вы найдете на сайтах транспортных компаний по ссылкам ниже. Доставка до транспортной ',
        'компании — бесплатно.</br>',
        '<a href="http://www.dellin.ru/">Деловые линии</a></br>',
        '<a href="http://pecom.ru/ru/">ПЭК</a></br>',
        '<a href="http://nevatk.ru/">Нева</a>'
    ].join(' ');

    view.render(bundleName);
};
