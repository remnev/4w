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
            data.valueForPrice && {
                elem: 'value-for-price',
                content: format('(%s)', data.valueForPrice)
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
                                    data.numberDiscount.pure.number > 0 && {
                                        tag: 'td',
                                        content: format('Цена от %s шт, белый ПВХ', data.numberDiscount.pure.number)
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Цена, цветной'
                                    },
                                    data.numberDiscount.laminate.number > 0 && {
                                        tag: 'td',
                                        content: format('Цена от %s шт, цветной', data.numberDiscount.laminate.number)
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
            var laminatePriceValue = format('%s руб.', article.price.laminate);

            if (data.baseDiscount.pure) {
                purePriceValue = [
                    {
                        tag: 'strike',
                        content: article.price.pure
                    },
                    ' ',
                    {
                        tag: 'b',
                        content: article.price.pure - article.price.pure * .01 * data.baseDiscount.pure
                    },
                    ' руб.'
                ];
            }

            if (data.baseDiscount.laminate) {
                laminatePriceValue = [
                    {
                        tag: 'strike',
                        content: article.price.laminate
                    },
                    ' ',
                    {
                        tag: 'b',
                        content: article.price.laminate - article.price.laminate * .01 * data.baseDiscount.laminate
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
                    data.numberDiscount.pure.number > 0 && {
                        tag: 'td',
                        content: [
                            article.price.pure - article.price.pure * .01 * data.numberDiscount.pure.value,
                            ' руб.'
                        ]
                    },
                    {
                        tag: 'td',
                        content: laminatePriceValue
                    },
                    data.numberDiscount.laminate.number > 0 && {
                        tag: 'td',
                        content: [
                            article.price.laminate - article.price.laminate * .01 * data.numberDiscount.laminate.value,
                            ' руб.'
                        ]
                    }
                ]
            };
        }
    });
};

