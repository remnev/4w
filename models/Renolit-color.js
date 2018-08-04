'use strict';

const keystone = require('keystone');
const format = require('util').format;

const RenolitColor = new keystone.List('RenolitColor', {
    label: 'Цвет renolit',
    singular: 'Цвет renolit',
    plural: 'Цвета renolit',
    map: {name: 'name'},
    defaultColumns: 'code, title',
});

RenolitColor.add({
    code: {
        type: Number,
        format: false,
        index: true,
    },
    title: {type: String},
    isPure: {
        type: Boolean,
        default: false,
        hidden: true,
    },
    // name: virtual
});

RenolitColor.schema.virtual('name').get(function() {
    return format('%s %s', this.code, this.title);
});

RenolitColor.register();
