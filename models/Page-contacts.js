'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const PageContacts = new keystone.List('PageContacts', {
    label: 'Страница о Контактах',
    nodelete: true,
    nocreate: true,
});

PageContacts.add(
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
        map: {type: String},
        panorama: {type: String},
    },
    {
        modifiedAt: {
            type: Types.Date,
            hidden: true,
        },
    }
);

PageContacts.schema.pre('save', function(next) {
    if (this.isModified()) {
        this.modifiedAt = new Date();
    }

    next();
});

PageContacts.register();
