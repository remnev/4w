'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('color-picker', function (ctx) {
        var productData = ctx.tParam('data').productData;
        var colors = productData.colors;

        if (!colors.available.length && !colors.onRequest.length && !productData.showPurePVC) {
            return false;
        }

        ctx
            .js(true)
            .content([
                {
                    elem: 'header',
                    content: [
                        'Выберите цвет ',
                        {
                            elem: 'pickedColor'
                        }
                    ]
                },
                {
                    elem: 'title',
                    mods: {
                        invisible: !productData.showPurePVC
                    },
                    content: 'Белый'
                },
                {
                    elem: 'colors',
                    content: productData.showPurePVC && {
                        elem: 'color',
                        mods: {
                            'no-laminate': true,
                            size: 'l'
                        },
                        attrs: {
                            'data-title': 'Белый',
                            'data-code': null,
                            'data-no-laminate': true
                        }
                    }
                },
                {
                    elem: 'title',
                    mods: {
                        invisible: colors.available.length === 0
                    },
                    content: 'Цвета по Renolit, в наличии'
                },
                {
                    elem: 'colors',
                    content: colors.available.map(generateColorBemjson.bind(null, true))
                },
                {
                    elem: 'title',
                    mods: {
                        invisible: colors.onRequest.length === 0
                    },
                    content: f('Цвета по Renolit, под заказ %s дн.', productData.ttd.onRequest)
                },
                {
                    elem: 'colors',
                    content: colors.onRequest.map(generateColorBemjson.bind(null, false))
                }
            ]);
    });

    function generateColorBemjson(isAvailable, data) {
        return {
            elem: 'color',
            mods: {
                size: isAvailable ? 'l' : 's'
            },
            attrs: {
                'data-title': data.name,
                'data-code': data.code,
                style: f('background-image: url(\'/public/images/colors/%s.jpg\');', data.code)
            },
            content: [
                {
                    elem: 'colorCode',
                    content: data.code
                }
            ]
        };
    }
};
