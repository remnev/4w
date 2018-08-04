'use strict';

const keystone = require('keystone');

const Coating = new keystone.List('Coating', {
    label: 'Тип покрытия',
    singular: 'Тип покрытия',
    plural: 'Типы покрытия',
});

Coating.add({
    name: {
        type: String,
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
        default: '',
    },
});

Coating.register();
