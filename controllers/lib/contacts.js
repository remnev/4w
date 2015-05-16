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

    locals.company = {
        phone: ' 8 (495) 134-74-47'
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
        'Мы находимся по адресу: г. Москва, ул. Монтажная д. 7 стр. 1',
        'Телефон: 8 (495) 134-74-47',
        'Электронная почта: <a href="mailto:contact@4window.ru">contact@4window.ru</a>',
        'На схеме ниже вы можете посмотреть как до нас добраться. Припарковать машину можно прямо перед нашим складом.',
        'Далее вам надо обратиться в красные ворота (на схеме ворота открыты) к кладовщику и назвать номер заказа.'
    ].join('</br>');

    locals.map = [
        '<script type="text/javascript" charset="utf-8" ',
        'src="https://api-maps.yandex.ru/services/constructor/1.0/js/',
        '?sid=TEe7Zbe4ZByTYSEp48fuvnq3_g8wyeBb&width=960&height=450"></script>'
    ].join('');

    locals.panorama = [
        '<iframe src="https://www.google.com/maps/embed?pb=!1m0!3m2!1sru!2sru!4v1431768871574!6m8!1m7!',
        '1srZ7mIkFAkx1Axxn-jo6BZw!2m2!1d55.81482!2d37.771349!3f62.11001349453642!4f0.12614983375910072!5f1.',
        '6715533031636123" width="960" height="450" frameborder="0" style="border:0"></iframe>'
    ].join('');

    view.render(bundleName);
};
