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
        var orderId = ctx.json().orderId;
        var buyerEmail = ctx.json().buyerEmail;
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
                        'Номер вашего заказа <b>' + orderId + '</b>. ',
                        'Подробности заказа отправлены на указанный вами почтовый ящик ' + buyerEmail + '. ',
                        'Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа.'
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
                                view: 'action'
                            },
                            mix: {
                                block: 'statuser',
                                elem: 'close'
                            },
                            text: 'Закрыть окно'
                        }
                    ]
                }
            ]
        };

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
