'use strict';

const keystone = require('keystone');

const MenuItem = new keystone.List('MenuItem', {
    label: 'Пункт меню',
    singular: 'Пункт меню',
    plural: 'Пункты меню',
    map: {name: 'title'},
    defaultColumns: 'title, url',
});

MenuItem.add({
    title: {type: String},
    url: {type: String},
});

MenuItem.register();
