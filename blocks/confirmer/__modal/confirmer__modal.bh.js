'use strict';

module.exports = function(bh) {
    bh.match('confirmer__modal', function(ctx) {
        var bemjson = {
            block: 'modal',
            mods: {theme: 'islands'},
            mix: {
                block: 'confirmer',
                elem: 'modal',
            },
            content: [
                {
                    block: 'confirmer',
                    elem: 'title',
                    content: 'Подтверждение заказа',
                },
                {
                    block: 'confirmer',
                    elem: 'order-items',
                    tag: 'table',
                    content: [
                        {
                            tag: 'thead',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'Наименование',
                                },
                                {
                                    tag: 'td',
                                    content: 'Количество (шт.)',
                                },
                                {
                                    tag: 'td',
                                    content: 'Цена (руб.)',
                                },
                                {
                                    tag: 'td',
                                    content: 'Стоимость (руб.)',
                                },
                            ],
                        },
                        ctx.json().orderItemsBemjson,
                        ctx.json().orderDeliveryItemBemjson,
                    ],
                },
                {
                    block: 'confirmer',
                    elem: 'params-list',
                    tag: 'table',
                    content: ctx.json().orderParamsBemjson,
                },
                {
                    block: 'confirmer',
                    elem: 'controls',
                    content: [
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                view: 'pseudo',
                            },
                            mix: {
                                block: 'confirmer',
                                elem: 'close-modal',
                            },
                            text: 'Закрыть окно',
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                view: 'pseudo',
                            },
                            mix: {
                                block: 'confirmer',
                                elem: 'back-to-checkout',
                            },
                            text: 'Назад к параметрам заказа',
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                view: 'action',
                            },
                            mix: {
                                block: 'confirmer',
                                elem: 'confirm',
                            },
                            text: 'Подтвердить заказ',
                        },
                    ],
                },
            ],
        };

        return bemjson;
    });
};
