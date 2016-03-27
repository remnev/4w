'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var PageIndex = new keystone.List('PageIndex', {
    label: 'Главная страница',
    plural: 'Главная страница',
    nodelete: true,
    nocreate: true
});

PageIndex.add(
    'Настройки SEO',
    {
        seo: {
            title: {type: String},
            description: {type: String}
        }
    }
);

PageIndex.register();
