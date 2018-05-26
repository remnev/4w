'use strict';

const keystone = require('keystone');

const YandexMarketInfo = new keystone.List('YandexMarketInfo', {
    label: 'Настройки магазина в Яндекс Маркете',
    plural: 'Настройки магазина в Яндекс Маркете',
    nodelete: true,
    nocreate: true,
});

YandexMarketInfo.add({
    name: {type: String},
    company: {type: String},
    url: {type: String},
    deliveryOptions: {
        days: {
            type: Number,
            format: false,
        },
        cost: {
            type: Number,
            format: false,
        },
    },
});

YandexMarketInfo.register();
