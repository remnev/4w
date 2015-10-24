'use strict';

var format = require('util').format;

module.exports = function (bh) {
    bh.match('pricer', function (ctx) {
        var data = ctx.tParam('data').currentProduct;
        var bemjson = [
            {
                elem: 'title',
                tag: 'h2',
                content: 'Цены'
            },
            {
                elem: 'table',
                tag: 'table',
                content: [
                    {
                        elem: 'thead',
                        tag: 'thead',
                        content: [
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Артикул'
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Размер'
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Цена, белый ПВХ'
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Цена, цветной'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        elem: 'tbody',
                        tag: 'tbody',
                        content: data.articles.map(generateRowBemjson)
                    }
                ]
            }
        ];

        ctx.content(bemjson);
    });
};

function generateRowBemjson(article) {
    return {
        tag: 'tr',
        content: [
            {
                tag: 'td',
                content: article.name
            },
            {
                tag: 'td',
                content: format('%s %s', article.size.value, article.size.units)
            },
            {
                tag: 'td',
                content: format('%s руб.', article.price.pure)
            },
            {
                tag: 'td',
                content: format('%s руб.', article.price.laminate)
            }
        ]
    };
}
