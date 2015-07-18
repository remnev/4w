'use strict';

module.exports = function (bh) {

    bh.match('statuser__modal_type_send', function () {
        var bemjson = {
            block: 'modal',
            mods: {theme: 'islands'},
            mix: {
                block: 'statuser',
                elem: 'modal',
                mods: {type: 'send'}
            },
            content: [
                {
                    block: 'statuser',
                    elem: 'title',
                    content: 'Отправляем данные заказа'
                },
                {
                    block: 'spin',
                    mods: {
                        theme: 'islands',
                        size: 'm',
                        visible: true
                    }
                }
            ]
        };

        return bemjson;
    });

    bh.match('statuser__modal_type_success', function (ctx) {
        var data = ctx.json().data;
        var bemjson = {
            block: 'modal',
            mods: {theme: 'islands'},
            mix: {
                block: 'statuser',
                elem: 'modal',
                mods: {type: 'success'}
            },
            content: [
                {
                    block: 'statuser',
                    elem: 'title',
                    content: 'Заказ отправлен'
                },
                {
                    block: 'statuser',
                    elem: 'text',
                    content: [
                        'Номер вашего заказа <b>' + data.orderId + '</b>. ',
                        'Подробности заказа отправлены на указанный вами почтовый ящик ' + data.buyerEmail + '. ',
                        'Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.',
                        data.isPaymentRequired ? '</br>Теперь вы можете оплатить заказ с помощью банковской карты.' +
                        ' Нажмите кнопку "Оплатить"' : ''
                    ]
                },
                {
                    block: 'statuser',
                    elem: 'controls',
                    content: [
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                view: data.isPaymentRequired ? 'pseudo' : 'action'
                            },
                            mix: {
                                block: 'statuser',
                                elem: 'close'
                            },
                            text: 'Закрыть окно'
                        },
                        data.isPaymentRequired ? {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                view: 'action'
                            },
                            mix: {
                                block: 'statuser',
                                elem: 'pay'
                            },
                            text: 'Оплатить'
                        } : ''
                    ]
                }
            ]
        };

        if (data.isPaymentRequired) {
            bemjson.content.push({
                block: 'statuser',
                elem: 'payment-form',
                tag: 'form',
                attrs: {
                    action: 'https://money.yandex.ru/eshop.xml',
                    type: 'post'
                },
                content: [
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'shopId',
                            value: '39148'
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'scid',
                            value: '4682319'
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'sum',
                            value: data.orderCoast
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'customerNumber',
                            value: data.buyerEmail
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'paymentType',
                            value: 'AC'
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'orderNumber',
                            value: data.orderId
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'hidden',
                            name: 'cps_email',
                            value: data.buyerEmail
                        }
                    },
                    {
                        tag: 'input',
                        attrs: {
                            type: 'submit'
                        },
                        content: 'ok'
                    }
                ]
            });
        }

        return bemjson;
    });

    bh.match('statuser__modal_type_fail', function () {
        var bemjson = {
            block: 'modal',
            mods: {theme: 'islands'},
            mix: {
                block: 'statuser',
                elem: 'modal',
                mods: {type: 'fail'}
            },
            content: [
                {
                    block: 'statuser',
                    elem: 'title',
                    content: 'Произошла ошибка отправки заказа'
                },
                {
                    block: 'statuser',
                    elem: 'text',
                    content: [
                        'Попробуйте отправить еще раз. ',
                        'Если ошибка повторяется, свяжитесь с нами по телефону или электронной почте.'
                    ]
                },
                {
                    block: 'statuser',
                    elem: 'controls',
                    content: [
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm'
                            },
                            mix: {
                                block: 'statuser',
                                elem: 'close'
                            },
                            text: 'Закрыть окно'
                        },
                        {
                            block: 'button',
                            mods: {
                                theme: 'islands',
                                size: 'm',
                                view: 'action'
                            },
                            mix: {
                                block: 'statuser',
                                elem: 'retry'
                            },
                            text: 'Попробовать еще раз'
                        }
                    ]
                }
            ]
        };

        return bemjson;
    });

};
