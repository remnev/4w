'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var PageDelivery = new keystone.List('PageDelivery', {
    label: 'Страница о Доставке',
    plural: 'Страница о Доставке',
    nodelete: true,
    nocreate: true
});

PageDelivery.add(
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

PageDelivery.register();
