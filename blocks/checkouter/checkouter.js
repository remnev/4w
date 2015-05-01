'use strict';

modules.define('checkouter', ['i-bem__dom', 'events__channels', 'bh'], function (provide, BEMDOM, channel, bh) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    var bemjson = {
                        block: 'modal',
                        mods: {theme: 'islands'},
                        mix: {
                            block: 'checkouter',
                            elem: 'modal'
                        },
                        content: [
                            {
                                block: 'checkouter',
                                elem: 'title',
                                content: 'Оформление заказа'
                            },
                            {
                                block: 'checkouter',
                                elem: 'table',
                                tag: 'table',
                                content: [
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Получение товара'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'radio-group',
                                                    mods: {
                                                        theme: 'islands',
                                                        size: 's',
                                                        type: 'button'
                                                    },
                                                    val: 'dim',
                                                    options: [
                                                        {
                                                            val: 'dim',
                                                            text: 'Доставка по Москве'
                                                        },
                                                        {
                                                            val: 'cym',
                                                            text: 'Самовывоз со склада в Москве'
                                                        },
                                                        {
                                                            val: 'dbtc',
                                                            text: 'Доставка транспортной компанией'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Оплата'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'radio-group',
                                                    mods: {
                                                        theme: 'islands',
                                                        size: 's',
                                                        type: 'button'
                                                    },
                                                    val: 'cc',
                                                    options: [
                                                        {
                                                            val: 'cc',
                                                            text: 'Пластиковая карта'
                                                        },
                                                        {
                                                            val: 'cache',
                                                            text: 'Наличные'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Дата доставки'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'select',
                                                    mods: {
                                                        mode: 'radio',
                                                        theme: 'islands',
                                                        size: 's'
                                                    },
                                                    val: new Date(),
                                                    options: [
                                                        {
                                                            val: new Date(),
                                                            text: new Date().toLocaleString('ru', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })
                                                        },
                                                        {
                                                            val: 'another',
                                                            text: 'Другая дата'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Адрес доставки'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'input',
                                                    mods: {
                                                        theme: 'islands',
                                                        size: 's'
                                                    },
                                                    placeholder: 'Город, улица, дом'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Имя получателя'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'input',
                                                    mods: {
                                                        theme: 'islands',
                                                        size: 's'
                                                    }
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Мобильный телефон'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'input',
                                                    mods: {
                                                        theme: 'islands',
                                                        size: 's'
                                                    },
                                                    placeholder: '+7 (XXX) XXX-XX-XX'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        tag: 'tr',
                                        content: [
                                            {
                                                tag: 'td',
                                                content: 'Комментарий к заказу'
                                            },
                                            {
                                                tag: 'td',
                                                content: {
                                                    block: 'textarea',
                                                    mods: {
                                                        theme: 'islands',
                                                        size: 's'
                                                    },
                                                    attrs: {
                                                        rows: 5
                                                    },
                                                    placeholder: [
                                                        'Например, дополнительный номер телефона,',
                                                        'особенности проезда и т.д.'
                                                    ].join(' ')
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                block: 'checkouter',
                                elem: 'controls',
                                content: [
                                    {
                                        block: 'button',
                                        mods: {
                                            theme: 'islands',
                                            size: 'm',
                                            view: 'pseudo'
                                        },
                                        mix: {
                                            block: 'checkouter',
                                            elem: 'close-modal'
                                        },
                                        text: 'Закрыть окно'
                                    },
                                    {
                                        block: 'button',
                                        mods: {
                                            theme: 'islands',
                                            size: 'm',
                                            view: 'pseudo'
                                        },
                                        mix: {
                                            block: 'checkouter',
                                            elem: 'back-to-order'
                                        },
                                        text: 'Назад к списку товаров'
                                    },
                                    {
                                        block: 'button',
                                        mods: {
                                            theme: 'islands',
                                            size: 'm',
                                            view: 'action'
                                        },
                                        mix: {
                                            block: 'checkouter',
                                            elem: 'next'
                                        },
                                        text: 'Далее'
                                    }
                                ]
                            }
                        ]
                    };

                    BEMDOM.append(this.domElem, bh.apply(bemjson));

                    this.modal = this.elem('modal').bem('modal');

                    this.bindTo('close-modal', 'click', this.closeModal);

                    channel('order').on('checkout', this.checkoutHandler, this);
                }
            }
        },

        checkoutHandler: function () {
            this.modal.setMod('visible');
        },

        closeModal: function () {
            this.modal.delMod('visible');
        }
    }));

});
