'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const PagePayment = new keystone.List('PagePayment', {
    label: 'Страница об Оплате',
    plural: 'Страница об Оплате',
    nodelete: true,
    nocreate: true,
});

PagePayment.add(
    'Настройки SEO',
    {
        seo: {
            title: {type: String},
            description: {type: String},
        },
    },
    'Содержимое страницы',
    {
        title: {type: String},
        text: {
            type: Types.Html,
            wysiwyg: true,
            height: 500,
        },
    },
    {
        modifiedAt: {
            type: Types.Date,
            hidden: true,
        },
    }
);

PagePayment.schema.pre('save', function(next) {
    if (this.isModified()) {
        this.modifiedAt = new Date();
    }

    next();
});

PagePayment.register();
