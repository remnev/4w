'use strict';

var keystone = require('keystone');

var PageProduct = new keystone.List('PageProduct', {
    label: 'Страница Продукта'
});

PageProduct.add(
    // todo: наследовать SEO во всех страницах
    'Настройки SEO',
    {
        seo: {
            title: {type: String},
            description: {type: String}
        }
    },
    'Настройки страницы',
    {
        slug: {type: String},
        name: {type: String}
    }
);

PageProduct.register();
