'use strict';

const keystone = require('keystone');
const Types = keystone.Field.Types;

const BaseInfo = new keystone.List('BaseInfo', {
    label: 'Общее для всех страниц',
    plural: 'Общее для всех страниц',
    nodelete: true,
    nocreate: true,
});

BaseInfo.add(
    'О компании',
    {
        company: {
            phone: {type: String},
            operationTime: {type: String},
        },
    },
    'Настройки логотипа',
    {
        logo: {
            name: {type: String},
            title: {type: String},
        },
    },
    'Главное меню',
    {
        mainMenu: {
            type: Types.Relationship,
            ref: 'MenuItem',
            many: true,
        },
    }
);

BaseInfo.register();
