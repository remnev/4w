'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var PageWarranty = new keystone.List('PageWarranty', {
    label: 'Страница о Гарантии и возврате',
    plural: 'Страница о Гарантии и возврате',
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
        }
    }
);

PageWarranty.register();