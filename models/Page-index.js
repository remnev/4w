'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const PageIndex = new keystone.List('PageIndex', {
    label: 'Главная страница',
    plural: 'Главная страница',
    nodelete: true,
    nocreate: true,
});

PageIndex.add(
    'Настройки SEO',
    {
        seo: {
            title: {type: String},
            description: {type: String},
        },
    },
    {
        modifiedAt: {
            type: Types.Date,
            hidden: true,
        },
    }
);

PageIndex.schema.pre('save', function(next) {
    if (this.isModified()) {
        this.modifiedAt = new Date();
    }

    next();
});

PageIndex.register();
