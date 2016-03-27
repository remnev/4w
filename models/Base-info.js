'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var BaseInfo = new keystone.List('BaseInfo', {
    label: 'Общее для всех страниц',
    plural: 'Общее для всех страниц',
    nodelete: true,
    nocreate: true
});

BaseInfo.add(
    'О компании',
    {
        company: {
            phone: {type: String},
            operationTime: {type: String}
        }
    },
    'Настройки логотипа',
    {
        logo: {
            name: {type: String},
            title: {type: String}
        }
    },
    'Главное меню',
    {
        mainMenu: {
            type: Types.Relationship,
            ref: 'MenuItem',
            many: true
        }
    }
);

BaseInfo.register();
