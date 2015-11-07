'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var PagePayment = new keystone.List('PagePayment', {
    label: 'Страница об Оплате',
    plural: 'Страница об Оплате',
    nodelete: true,
    nocreate: true
});

PagePayment.add(
    'Настройки SEO',
    {
        seo: {
            title: {type: String},
            description: {type: String}
        }
    },
    'Содержимое страницы',
    {
        title: {type: String},
        text: {
            type: Types.Html,
            wysiwyg: true,
            height: 500
        }
    }
);

PagePayment.register();
