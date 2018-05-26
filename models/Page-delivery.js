'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const PageDelivery = new keystone.List('PageDelivery', {
    label: 'Страница о Доставке',
    plural: 'Страница о Доставке',
    nodelete: true,
    nocreate: true,
});

PageDelivery.add(
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

PageDelivery.schema.pre('save', function(next) {
    if (this.isModified()) {
        this.modifiedAt = new Date();
    }

    next();
});

PageDelivery.register();
