'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
    label: 'Продукт',
    singular: 'Продукт',
    plural: 'Продукты'
});

Product.add({
    slug: {
        type: String,
        index: true
    },
    name: {
        type: String
    },
    articles: {
        type: Types.Relationship,
        ref: 'Article',
        many: true,
        filters: {belongsTo: ':slug'}
    },
    showPurePVC: {
        type: Types.Boolean
    },
    colors: {
        available: {
            type: Types.Relationship,
            ref: 'Color',
            many: true
        },
        onRequest: {
            type: Types.Relationship,
            ref: 'Color',
            many: true
        }
    },
    description: {
        type: Types.Html,
        wysiwyg: true,
        height: 100
    },
    aboutProduct: {
        type: Types.Html,
        wysiwyg: true,
        height: 100
    },
    photos: {
        type: Types.CloudinaryImages
    },
    showPriceTable: {
        type: Types.Boolean
    },
    type: {
        type: Types.Select,
        default: 'prof',
        emptyOption: false,
        options: [
            {
                value: 'prof',
                label: 'Для профессионалов'
            },
            {
                value: 'home',
                label: 'Для дома'
            }
        ]
    },
    state: {
        type: Types.Select,
        default: 'unpublished',
        emptyOption: false,
        options: [
            {
                value: 'published',
                label: 'Опубликовано'
            },
            {
                value: 'unpublished',
                label: 'Не опубликовано'
            }
        ]
    },
    discountPure: {
        type: Types.Number,
        label: 'Скидка на белый ПВХ (%)',
        format: false,
        default: 0
    }
});

Product.register();
