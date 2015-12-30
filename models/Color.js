'use strict';

var keystone = require('keystone');
var format = require('util').format;

var Color = new keystone.List('Color', {
    label: 'Цвет',
    singular: 'Цвет',
    plural: 'Цвета',
    map: {name: 'name'}
});

Color.add({
    code: {
        type: Number,
        format: false,
        index: true
    },
    title: {type: String}
    // name: virtual
});

Color.schema.virtual('name').get(function () {
    return format('%s %s', this.code, this.title);
});

Color.register();
