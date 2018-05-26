'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const PageWarranty = new keystone.List('PageWarranty', {
    label: 'Страница о Гарантии и возврате',
    plural: 'Страница о Гарантии и возврате',
    nodelete: true,
    nocreate: true,
});

PageWarranty.add(
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

PageWarranty.schema.pre('save', function(next) {
    if (this.isModified()) {
        this.modifiedAt = new Date();
    }

    next();
});

PageWarranty.register();
