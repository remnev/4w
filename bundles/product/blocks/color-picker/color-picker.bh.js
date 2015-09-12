'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('color-picker', function (ctx) {
        var data = ctx.tParam('data');
        var colors = data.colors;

        if (!colors.main.length && !colors.other.length && !colors.noLaminate.length) {
            return;
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
                        invisible: colors.noLaminate.length === 0
                    },
                    content: 'Белый'
                },
                {
                    elem: 'colors',
                    content: colors.noLaminate.map(generateColorBemjson)
                },
                {
                    elem: 'title',
                    mods: {
                        invisible: colors.main.length === 0
                    },
                    content: 'Ламинированные, уже на складе'
                },
                {
                    elem: 'colors',
                    content: colors.main.map(generateColorBemjson)
                },
                {
                    elem: 'title',
                    mods: {
                        invisible: colors.other.length === 0
                    },
                    content: 'Ламинированные, под заказ 10 дней'
                },
                {
                    elem: 'colors',
                    content: colors.other.map(generateColorBemjson)
                }
            ]);
    });

    function generateColorBemjson(data) {
        var content = [{
            elem: 'colorCode',
            content: data.code
        }];

        if (data.isLaminate) {
            content.unshift({
                block: 'image',
                url: f('/public/images/colors/%s.jpg', data.code)
            });
        }

        return {
            elem: 'color',
            mods: {
                'no-laminate': !data.isLaminate,
                size: data.isMainColor ? 'l' : 's'
            },
            attrs: {
                'data-title': data.name,
                'data-code': data.code,
                'data-no-laminate': !data.isLaminate
            },
            content: content
        };
    }
};
