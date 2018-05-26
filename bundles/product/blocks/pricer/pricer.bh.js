'use strict';

var format = require('util').format;

module.exports = function(bh) {
    bh.match('pricer', function(ctx) {
        var data = ctx.tParam('data').productData;
        var bemjson = [
            {
                elem: 'title',
                tag: 'h2',
                content: 'Цены',
            },
            data.valueForPrice && {
                elem: 'value-for-price',
                content: format('(%s)', data.valueForPrice),
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
                                        content: 'Артикул',
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Размер',
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Цена, белый ПВХ',
                                    },
                                    data.numberDiscount.pure.number > 0 && {
                                        tag: 'td',
                                        content: format('Цена от %s шт, белый ПВХ', data.numberDiscount.pure.number),
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Цена, цветной',
                                    },
                                    data.numberDiscount.laminate.number > 0 && {
                                        tag: 'td',
                                        content: format('Цена от %s шт, цветной', data.numberDiscount.laminate.number),
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        elem: 'tbody',
                        tag: 'tbody',
                        content: data.articles.map(generateRowBemjson),
                    },
                ],
            },
        ];

        ctx.content(bemjson);

        /**
         * Takes an article bemjson
         *
         * @param  {Object} article
         * @return {Object}
         */
        function generateRowBemjson(article) {
            var purePriceValue = format('%s руб.', article.price.pure);
            var laminatePriceValue = format('%s руб.', article.price.laminate);
            var purePriceValueFromAmount;
            var laminatePriceValueFromAmount;

            if (data.baseDiscount.pure) {
                purePriceValue = [
                    {
                        tag: 'strike',
                        content: article.price.pure,
                    },
                    ' ',
                    {
                        tag: 'b',
                        content: Math.floor(article.price.pure - article.price.pure * .01 * data.baseDiscount.pure),
                    },
                    ' руб.',
                ];
            }

            if (data.baseDiscount.laminate) {
                laminatePriceValue = [
                    {
                        tag: 'strike',
                        content: article.price.laminate,
                    },
                    ' ',
                    {
                        tag: 'b',
                        content: Math.floor(
                            article.price.laminate -
                            article.price.laminate * .01 * data.baseDiscount.laminate
                        ),
                    },
                    ' руб.',
                ];
            }

            if (data.numberDiscount.pure.number > 0) {
                purePriceValueFromAmount = [
                    Math.floor(
                        article.price.pure -
                        (
                            article.price.pure * .01 * data.numberDiscount.pure.value +
                            article.price.pure * .01 * data.baseDiscount.pure
                        )
                    ),
                    ' руб.',
                ];
            }

            if (data.numberDiscount.laminate.number > 0) {
                laminatePriceValueFromAmount = [
                    Math.floor(
                        article.price.laminate -
                        (
                            article.price.laminate * .01 * data.numberDiscount.laminate.value +
                            article.price.laminate * .01 * data.baseDiscount.laminate
                        )
                    ),
                    ' руб.',
                ];
            }

            return {
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: article.name,
                    },
                    {
                        tag: 'td',
                        content: format('%s %s', article.size.value, article.size.units),
                    },
                    {
                        tag: 'td',
                        content: purePriceValue,
                    },
                    data.numberDiscount.pure.number > 0 && {
                        tag: 'td',
                        content: purePriceValueFromAmount,
                    },
                    {
                        tag: 'td',
                        content: laminatePriceValue,
                    },
                    data.numberDiscount.laminate.number > 0 && {
                        tag: 'td',
                        content: laminatePriceValueFromAmount,
                    },
                ],
            };
        }
    });
};

