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
    belongsTo: {
        type: Types.Select,
        options: 'angles, cleaning-kit, decorative-window-bars, flat-strips-on-roll, handles-with-key, pens'
    }
});

Article.register();