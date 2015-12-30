'use strict';

module.exports = function (bh) {
    bh.match('number-picker', function (ctx) {
        var data = ctx.tParam('data').productData;

        ctx
            .js({
                productName: data.name,
                productSlug: data.slug,
                productDiscountPure: data.discountPure
            })
            .content([
                {
                    elem: 'header',
                    content: [
                        'Выберите количество ',
                        {
                            elem: 'pickedNumber'
                        }
                    ]
                },
                {
                    elem: 'form',
                    content: [
                        {
                            block: 'counter',
                            mix: {
                                block: 'number-picker',
                                elem: 'number'
                            }
                        },
                        {
                            elem: 'multiply',
                            content: '×'
                        },
                        {
                            block: 'input',
                            mods: {disabled: true},
                            mix: {
                                block: 'number-picker',
                                elem: 'price'
                            }
                        },
                        {
                            elem: 'equal',
                            content: '='
                        },
                        {
                            block: 'input',
                            mods: {disabled: true},
                            mix: {
                                block: 'number-picker',
                                elem: 'coast'
                            }
                        }
                    ]
                },
                {
                    elem: 'order-description',
                    mods: {hidden: true},
                    content: [
                        {
                            elem: 'order-description-title',
                            content: 'Вы подготовили к заказу:'
                        },
                        {elem: 'order-description-item'},
                        {elem: 'order-description-laminate'},
                        {elem: 'order-description-color'},
                        {elem: 'order-description-size'},
                        {elem: 'order-description-number'},
                        {elem: 'order-description-coast'}
                    ]
                },
                {
                    elem: 'submit',
                    content: 'В заказ'
                }
            ]);
    });

};
