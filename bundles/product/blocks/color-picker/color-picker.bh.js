'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('color-picker', function (ctx) {
        var colors = ctx.tParam('data').productData.colors;

        if (!colors.available.length && !colors.onRequest.length) {
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
                    content: 'Белый'
                },
                {
                    elem: 'colors',
                    content: {
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
                    elem: 'colors',
                    content: colors.available.map(generateColorBemjson.bind(null, true))
                },
                {
                    elem: 'title',
                    mods: {
                        invisible: Boolean(colors.onRequest.length)
                    },
                    content: 'Под заказ 10 дней'
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
                'data-code': data.code
            },
            content: [
                {
                    elem: 'colorCode',
                    content: data.code
                },
                {
                    block: 'image',
                    url: f('/public/images/colors/%s.jpg', data.code)
                }
            ]
        };
    }
};
