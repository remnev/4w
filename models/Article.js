'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Article = new keystone.List('Article', {
    label: 'Артикул',
    singular: 'Артикул',
    plural: 'Артикулы'
});

Article.add({
    name: {
        type: String,
        required: true,
        index: true
    },
    price: {
        pure: {type: Number},
        laminate: {type: Number}
    },
    size: {
        units: {type: String},
        value: {type: String}
    },
    weight: {
        type: Number,
        format: false,
        note: 'в кг'
    },
    dimensions: {
        type: String,
        note: 'в см, длина/ширина/высота в упаковке'
    },
    belongsTo: {
        type: Types.Select,
        options: [
            'angles',
            'cleaning-kit',
            'decorative-window-bars',
            'drywall-profile-f',
            'drywall-profile-u',
            'cover-strips',
            'flat-strips-on-roll',
            'flat-strips',
            'handles-with-key',
            'handles-for-balkon-door',
            'locker-for-balkon-door',
            'handles+locker-for-balkon-door',
            'comb',
            'pens'
        ]
    }
});

Article.register();
