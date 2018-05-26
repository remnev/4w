'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const Article = new keystone.List('Article', {
    label: 'Артикул',
    singular: 'Артикул',
    plural: 'Артикулы',
});

Article.add({
    name: {
        type: String,
        required: true,
        index: true,
    },
    price: {
        pure: {type: Number},
        laminate: {type: Number},
    },
    size: {
        units: {type: String},
        value: {type: String},
    },
    weight: {
        type: Number,
        format: false,
        note: 'в кг',
    },
    dimensions: {
        type: String,
        note: 'в см, длина/ширина/высота в упаковке',
    },
    belongsTo: {
        type: Types.Select,
        options: [
            'angles',
            'cleaning-kit',
            'comb',
            'cover-strips',
            'decorative-window-bars',
            'drywall-profile-f',
            'drywall-profile-u',
            'flat-strips-on-roll',
            'flat-strips',
            'handles-with-key',
            'handles-for-balkon-door',
            'handles+locker-for-balkon-door',
            'locker-for-balkon-door',
            'pens',
            'sealant-tape',
            'thermometer',
            'linker-for-rehau',
        ],
    },
});

Article.register();
