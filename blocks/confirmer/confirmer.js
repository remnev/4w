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
            BEMDOM.update(this.domElem, bh.apply({
                block: 'confirmer',
                elem: 'modal',
                orderItems: this
                    .findBlockOutside('page')
                    .findBlockInside('order')
                    .getOrderItems()
                    .map(this.generateOrderItemBemjson),
                delivery: this
                    .findBlockOutside('page')
                    .findBlockInside('checkouter')
                    .typeOfGettingRG
                    .getVal() === 'dim' ? this.generateOrderItemBemjson({
                        productName: 'Доставка в пределах МКАД',
                        number: 1,
                        price: 500
                    }) : ''
            }));

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
