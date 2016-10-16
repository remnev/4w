'use strict';

var keystone = require('keystone');
var format = require('util').format;

var Color = new keystone.List('Color', {
    label: 'Цвет',
    singular: 'Цвет',
    plural: 'Цвета',
    map: {name: 'name'},
    defaultColumns: 'code, title'
});

Color.add({
    code: {
        type: Number,
        format: false,
        index: true
    },
    title: {type: String},
    isPure: {
        type: Boolean,
        default: false,
        hidden: true
    }
    // name: virtual
});

Color.schema.virtual('name').get(function () {
    return format('%s %s', this.code, this.title);
});

Color.register();
