'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var PageWarranty = new keystone.List('PageContacts', {
    label: 'Страница о Контактах',
    nodelete: true,
    nocreate: true
});

PageWarranty.add(
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
        },
        map: {type: String},
        panorama: {type: String},
    }
);

PageWarranty.register();
