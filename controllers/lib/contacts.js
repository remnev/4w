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
        title: 'Как добраться — контакты магазина 4window',
        description:
            'Схема проезда в магазин оконных принадлежностей 4window. Посмотреть на карте. Распечатать схему проезда.'
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
        phone: ' 8 (495) 134-74-47',
        operationTime: 'пн — пт с 9:00 до 17:00'
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
            title: 'Контакты',
            url: '/contacts/'
        }
    ];

    locals.description = [
        'Мы находимся по адресу: г. Москва, ул. Амурская д. 15/1</br>',
        'Телефон: 8 (495) 134-74-47</br>',
        'Электронная почта: <a href="mailto:contact@4window.ru">contact@4window.ru</a></br></br>',
        'На схеме ниже вы можете посмотреть как до нас добраться. Припарковать машину можно на обочине Байкальского ',
        'переулка или Амурской улицы. ',
        'Далее вам надо войти в коричневые ворота с Байкальского пер. (см. схему) и выписать у охранника пропуск в ООО',
        ' "Проформ". Затем идите по территории прямо 30 метров. Слева увидите большие красные ворота. ',
        'Там обратитесь к сотруднику фирмы ООО "Проформ", назовите номер заказа и получите товар.'
    ].join('');

    locals.map = [
        '<script type="text/javascript" charset="utf-8" ',
        'src="https://api-maps.yandex.ru/services/constructor/1.0/js/',
        '?sid=TEe7Zbe4ZByTYSEp48fuvnq3_g8wyeBb&width=960&height=450"></script>'
    ].join('');

    locals.panorama = [
        '<iframe src="https://www.google.com/maps/embed?pb=!1m0!3m2!1sru!2sru!4v1444155761223!6m8!1m7!1smlxZ9KQhBqv6n',
        '1vUvRyKeA!2m2!1d55.81366959646946!2d37.78160204681784!3f78.09876911717332!4f-5.6474296761384295!5f0.40000000',
        '00000002" width="960" height="450" frameborder="0" style="border:0"></iframe>'
    ].join('');

    view.render(bundleName);
};
