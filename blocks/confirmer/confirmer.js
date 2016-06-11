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
            var orderBlock = this
                .findBlockOutside('page')
                .findBlockInside('order');
            var checkouterBlock = this
                .findBlockOutside('page')
                .findBlockInside('checkouter');

            BEMDOM.update(this.domElem, bh.apply({
                block: 'confirmer',
                elem: 'modal',
                orderItemsBemjson: orderBlock
                    .getOrderItems()
                    .map(this.generateOrderItemBemjson, this),
                orderDeliveryItemBemjson: checkouterBlock
                    .typeOfGettingRG
                    .getVal() === 'dim' ? this.generateOrderItemBemjson({
                        productName: 'Доставка в пределах МКАД',
                        number: 1,
                        price: 500,
                        discount: {
                            base: {
                                laminate: 0,
                                pure: 0
                            },
                            number: {
                                laminate: {
                                    laminate: 0,
                                    pure: 0
                                },
                                pure: {
                                    laminate: 0,
                                    pure: 0
                                }
                            }
                        }
                    }) : '',
                orderParamsBemjson: checkouterBlock
                    .getPickedParams()
                    .map(this.generateOrderParamBemjson)
            }));

            this.modal = this.findElem('modal').bem('modal');
            this.closeModalElem = this.findElem('close-modal');
            this.backToCheckoutElem = this.findElem('back-to-checkout');
            this.confirmElem = this.findElem('confirm');

            this.bindTo(this.closeModalElem, 'click', this.closeModal);
            this.bindTo(this.backToCheckoutElem, 'click', this.returnToCheckout);
            this.bindTo(this.confirmElem, 'click', this.confirmOrder);

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
            var priceType = data.isLaminate ? 'laminate' : 'pure';
            var price = data.price - this.calculateDiscount(data.price, priceType, data.number, data.discount);

            return {
                block: 'confirmer',
                elem: 'order-item',
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'order-item-title',
                            content: data.productName +
                                (data.color ? ', ' + data.color.name + (data.size ? ', ' + data.size : '') : '')
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'order-item-count',
                            content: data.number
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'order-item-price',
                            content: price
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'confirmer',
                            elem: 'order-item-coast',
                            content: data.number * price
                        }
                    }
                ]
            };
        },

        generateOrderParamBemjson: function (data) {
            if (!data) {
                return null;
            }

            return {
                block: 'confirmer',
                elem: 'order-param',
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: data.title
                    },
                    {
                        tag: 'td',
                        content: data.value
                    }
                ]
            };
        },

        confirmOrder: function () {
            this.closeModal();

            channel('order').emit('send');
        },

        calculateDiscount: function (basePrice, priceType, number, discountData) {
            console.log(arguments);
            var baseDiscount = basePrice * 0.01 * discountData.base[priceType];
            var numberDiscount = 0;

            if (number >= discountData.number[priceType].number) {
                numberDiscount = basePrice * 0.01 * discountData.number[priceType].value;
            }

            return baseDiscount + numberDiscount;
        }
    }));

});
