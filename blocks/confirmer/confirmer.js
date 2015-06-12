'use strict';

modules.define('confirmer',
['i-bem__dom', 'events__channels', 'bh'],
function (provide, BEMDOM, channel, bh) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    channel('order').on('confirm', this.confirmHandler, this);
                }
            }
        },

        confirmHandler: function () {
            var bemjson = {
                block: 'modal',
                mods: {theme: 'islands'},
                mix: {
                    block: 'confirmer',
                    elem: 'modal'
                },
                content: [
                    {
                        block: 'confirmer',
                        elem: 'title',
                        content: 'Подтверждение заказа'
                    },
                    {
                        block: 'confirmer',
                        elem: 'items-list',
                        tag: 'table',
                        content: [
                            {
                                tag: 'thead',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Наименование'
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Количество (шт.)'
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Цена (руб.)'
                                    },
                                    {
                                        tag: 'td',
                                        content: 'Стоимость (руб.)'
                                    }
                                ]
                            },
                            this
                                .findBlockOutside('page')
                                .findBlockInside('order')
                                .getOrderItems()
                                .map(this.generateOrderItemBemjson),
                            this
                                .findBlockOutside('page')
                                .findBlockInside('checkouter')
                                .typeOfGettingRG
                                .getVal() === 'dim' ? this.generateOrderItemBemjson({
                                    productName: 'Доставка в пределах МКАД',
                                    number: 1,
                                    price: 500
                                }) : ''
                        ]
                    },
                    {
                        block: 'confirmer',
                        elem: 'params-list',
                        tag: 'table',
                        content: [
                        ]
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
                                    view: 'pseudo'
                                },
                                mix: {
                                    block: 'confirmer',
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
                                    block: 'confirmer',
                                    elem: 'back-to-checkout'
                                },
                                text: 'Назад к параметрам заказа'
                            },
                            {
                                block: 'button',
                                mods: {
                                    theme: 'islands',
                                    size: 'm',
                                    view: 'action'
                                },
                                mix: {
                                    block: 'confirmer',
                                    elem: 'confirm'
                                },
                                text: 'Подтвердить заказ'
                            }
                        ]
                    }
                ]
            };

            BEMDOM.update(this.domElem, bh.apply(bemjson));

            this.modal = this.findElem('modal').bem('modal');
            this.closeModalElem = this.findElem('close-modal');
            this.backToCheckoutElem = this.findElem('back-to-checkout');

            this.bindTo(this.closeModalElem, 'click', this.closeModal);
            this.bindTo(this.backToCheckoutElem, 'click', this.returnToCheckout);

            this.modal.setMod('visible');
        },

        closeModal: function () {
            this.modal.delMod('visible');

            return this;
        },

        returnToCheckout: function () {
            this
                .closeModal()
                .findBlockOutside('page')
                .findBlockInside('checkouter')
                .modal
                .setMod('visible');
        },

        generateOrderItemBemjson: function (data) {
            return {
                block: 'confirmer',
                elem: 'item',
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'item-title',
                            content: data.productName +
                                (data.color ? ', ' + data.color.name + (data.size ? ', ' + data.size : '') : '')
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'item-count',
                            content: data.number
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'item-price',
                            content: data.price
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'item-coast',
                            content: data.number * data.price
                        }
                    }
                ]
            };
        }
    }));

});
