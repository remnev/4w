'use strict';

var keystone = require('keystone');

var MenuItem = new keystone.List('MenuItem', {
    label: 'Пункт меню',
    singular: 'Пункт меню',
    plural: 'Пункты меню',
    map: {name: 'title'},
    defaultColumns: 'title, url'
});

MenuItem.add({
    title: {type: String},
    url: {type: String}
});

MenuItem.register();
