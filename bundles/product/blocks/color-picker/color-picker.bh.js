'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('color-picker', function (ctx) {
        var data = ctx.tParam('data');
        var colors = data.colors;

        ctx
            .js(true)
            .content([
                {
                    elem: 'header',
                    content: [
                        'Выберите цвет профиля ',
                        {
                            elem: 'pickedColor'
                        }
                    ]
                },
                {
                    elem: 'title',
                    content: 'Без ламинации'
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
                            'data-code': 915205,
                            'data-no-laminate': true
                        },
                        content: {
                            elem: 'colorCode',
                            content: 915205
                        }
                    }
                },
                {
                    elem: 'title',
                    content: 'Ламинированные, уже на складе'
                },
                {
                    elem: 'colors',
                    content: colors.main.map(generateColorBemjson)
                },
                {
                    elem: 'title',
                    content: 'Ламинированные, под заказ 10 дней'
                },
                {
                    elem: 'colors',
                    content: colors.other.map(generateColorBemjson)
                }
            ]);
    });

    function generateColorBemjson(data) {
        return {
            elem: 'color',
            mods: {
                size: data.isMainColor ? 'l' : 's'
            },
            attrs: {
                'data-title': data.name,
                'data-code': data.code
            },
            content: [
                {
                    block: 'image',
                    url: f('/public/images/colors/%s.jpg', data.code)
                },
                {
                    elem: 'colorCode',
                    content: data.code
                }
            ]
        };
    }
};
