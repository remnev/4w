'use strict';

var format = require('util').format;

module.exports = function (bh) {
    bh.match('pricer', function (ctx) {
        var data = ctx.tParam('data').productData;
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

        function generateRowBemjson(article) {
            var purePriceValue = format('%s руб.', article.price.pure);

            if (data.discountPure && typeof data.discountPure === 'number') {
                purePriceValue = [
                    {
                        tag: 'strike',
                        content: article.price.pure
                    },
                    ' ',
                    {
                        tag: 'b',
                        content: article.price.pure - article.price.pure * .01 * data.discountPure
                    },
                    ' руб.'
                ];
            }

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
                        content: purePriceValue
                    },
                    {
                        tag: 'td',
                        content: format('%s руб.', article.price.laminate)
                    }
                ]
            };
        }
    });
};

