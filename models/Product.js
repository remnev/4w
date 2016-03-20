'use strict';

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Product = new keystone.List('Product', {
    label: 'Продукт',
    singular: 'Продукт',
    plural: 'Продукты',
    defaultSort: 'sortWeight',
    defaultColumns: 'type, sortWeight'
});

Product.add(
    {
        slug: {
            type: String,
            index: true
        },
        name: {
            type: String
        },
        vendor: {
            type: String
        },
        articles: {
            type: Types.Relationship,
            ref: 'Article',
            many: true,
            filters: {belongsTo: ':slug'}
        },
        showPurePVC: {
            type: Types.Boolean
        },
        colors: {
            available: {
                type: Types.Relationship,
                ref: 'Color',
                many: true
            },
            onRequest: {
                type: Types.Relationship,
                ref: 'Color',
                many: true
            }
        },
        description: {
            type: Types.Html,
            wysiwyg: true,
            height: 100
        },
        aboutProduct: {
            type: Types.Html,
            wysiwyg: true,
            height: 100
        },
        photos: {
            type: Types.CloudinaryImages
        },
        showPriceTable: {
            type: Types.Boolean
        },
        type: {
            type: Types.Select,
            default: 'prof',
            emptyOption: false,
            options: [
                {
                    value: 'prof',
                    label: 'Для профессионалов'
                },
                {
                    value: 'home',
                    label: 'Для дома'
                }
            ]
        },
        state: {
            type: Types.Select,
            default: 'unpublished',
            emptyOption: false,
            options: [
                {
                    value: 'published',
                    label: 'Опубликовано'
                },
                {
                    value: 'unpublished',
                    label: 'Не опубликовано'
                }
            ]
        },
        // todo: сделать это объектом discount: {pure: 1, laminate: 2}
        discountPure: {
            type: Types.Number,
            label: 'Скидка на белый ПВХ (%)',
            format: false,
            default: 0
        },
        deliveryOptions: {
            days: {
                available: {
                    type: Types.Number,
                    label: 'Срок доставки, наличие',
                    format: false,
                    default: 2
                },
                onRequest: {
                    type: Types.Number,
                    label: 'Срок доставки, под заказ',
                    format: false,
                    default: 10
                }
            },
            cost: {
                type: Number,
                format: false
            }
        },
        sortWeight: {
            type: Types.Number,
            label: 'Вес сортировки',
            format: false,
            default: 1000
        }
    },
    'Настройки для Яндекс Маркета',
    {
        exportToYandexMarket: {
            type: Boolean,
            default: false
        },
        yandexMarketPicture: {
            pure: {type: Types.CloudinaryImage},
            laminate: {type: Types.CloudinaryImage}
        },
        yandexMarketCategory: {
            type: String
        },
        yandexMarketStore: {
            type: Boolean,
            default: true,
            label: 'Можно купить, приехав в магазин'
        },
        yandexMarketPickup: {
            type: Boolean,
            default: true,
            label: 'Можно зарезервировать, приехать и забрать самостоятельно'
        },
        yandexMarketDelivery: {
            type: Boolean,
            default: true,
            label: 'Можно заказать с доставкой'
        },
        yandexMarketDescription: {
            type: Types.Textarea,
            note: 'Максимум 150 символов. Остальное будет обрезано.'
        },
        yandexMarketSalesNotes: {
            type: String
        },
        yandexMarketParams: {
            length: {
                value: {type: String},
                name: {type: String}
            },
            material: {
                value: {type: String},
                name: {type: String}
            },
            usage: {
                value: {type: String},
                name: {type: String}
            }
        }
    }
);

Product.register();
