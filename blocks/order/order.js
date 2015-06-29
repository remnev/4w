'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'bh', 'jquery'],
function (provide, channel, bh, $, BEMDOM) {

    BEMDOM.decl('order', {
        onSetMod: {
            js: {
                inited: function () {
                    var orderItems = this.getOrderItems();
                    var bemjson = [{
                        block: 'modal',
                        mods: {theme: 'islands'},
                        mix: {
                            block: 'order',
                            elem: 'add-to-order-modal'
                        },
                        content: [
                            {
                                block: 'order',
                                elem: 'add-to-order-modal-title',
                                content: 'Товар добавлен в заказ'
                            },
                            {
                                block: 'order',
                                elem: 'add-to-order-modal-items',
                                tag: 'table'
                            },
                            {
                                block: 'order',
                                elem: 'add-to-order-modal-coast-wrapper',
                                content: [
                                    {
                                        block: 'order',
                                        elem: 'add-to-order-modal-coast-title',
                                        content: 'Общая стоимость:'
                                    },
                                    {
                                        block: 'order',
                                        elem: 'add-to-order-modal-coast-value'
                                    }
                                ]
                            },
                            {
                                block: 'order',
                                elem: 'add-to-order-modal-controls',
                                content: [
                                    {
                                        block: 'button',
                                        mods: {
                                            theme: 'islands',
                                            size: 'm',
                                            view: 'pseudo'
                                        },
                                        mix: {
                                            block: 'order',
                                            elem: 'clear-order'
                                        },
                                        text: 'Очистить заказ'
                                    },
                                    {
                                        block: 'button',
                                        mods: {
                                            theme: 'islands',
                                            size: 'm',
                                            view: 'pseudo'
                                        },
                                        mix: {
                                            block: 'order',
                                            elem: 'add-to-order-modal-continue-control'
                                        },
                                        text: 'Продолжить выбор товара'
                                    },
                                    {
                                        block: 'button',
                                        mods: {
                                            theme: 'islands',
                                            size: 'm',
                                            view: 'action'
                                        },
                                        mix: {
                                            block: 'order',
                                            elem: 'checkout-control'
                                        },
                                        text: 'Оформить'
                                    }
                                ]
                            }
                        ]
                    }];
                    var itemName;
                    var coast = this.getOrderCoast();

                    if (orderItems.length) {
                        itemName = this.getItemNameByNumber(orderItems.length);

                        bemjson.push({
                            block: 'link',
                            mods: {
                                theme: 'islands',
                                pseudo: true
                            },
                            mix: {
                                block: 'order',
                                elem: 'modalOpener'
                            },
                            content: 'В заказе ' + orderItems.length + ' ' + itemName + ' на ' + coast + ' ₽'
                        });
                    }

                    BEMDOM.append(this.domElem, bh.apply(bemjson));

                    this.addToOrderModal = this.elem('add-to-order-modal').bem('modal');
                    this.addToOrderModalItems = this.elem('add-to-order-modal-items');
                    this.addToOrderContinueControl = this.elem('add-to-order-modal-continue-control');

                    this
                        .bindTo(this.addToOrderContinueControl, 'click', this.addToOrderContinueControlClickHandler)
                        .bindTo('modalOpener', 'click', this.showAddToOrderModal)
                        .bindTo('clear-order', 'click', this.clearOrderHandler)
                        .bindTo('checkout-control', 'click', this.checkoutControlClickHandler);

                    channel('number-picker').on('submitClick', this.addToOrder, this);
                    channel('order').on('delete-item', this.deleteFromOrder, this);
                    channel('order').on('change-item-number', this.changeItemNumberHandler, this);
                }
            }
        },

        addToOrder: function (e, data) {
            this.setOrderItem(data)
                .showAddToOrderModal();
        },

        deleteFromOrder: function (e, data) {
            this.deleteOrderItem(data);

            if (!this.getOrderItems().length) {
                this
                    .reCalcCoast()
                    .addToOrderModal.delMod('visible');

                return this;
            }

            this.showAddToOrderModal();

            return this;
        },

        showAddToOrderModal: function () {
            var orderItems = this.getOrderItems();
            var orderItemsBemjson = [
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
                        {tag: 'td'}
                    ]
                }
            ].concat(orderItems.map(this.generateOrderItemBemjson));

            BEMDOM.update(this.addToOrderModalItems, bh.apply(orderItemsBemjson));

            this
                .reCalcCoast()
                .addToOrderModal.setMod('visible');

            return this;
        },

        getOrderItems: function () {
            return JSON.parse(localStorage.getItem('order:items')) || [];
        },

        setOrderItem: function (data) {
            var items = this.getOrderItems() || [];

            items.push(data);

            localStorage.setItem('order:items', JSON.stringify(items));

            return this;
        },

        deleteOrderItem: function (itemId) {
            var items = this.getOrderItems();

            if (!items.length) {
                return this;
            }

            items.splice(itemId, 1);

            localStorage.setItem('order:items', JSON.stringify(items));

            return this;
        },

        deleteOrderItems: function () {
            localStorage.removeItem('order:items');

            this.reCalcCoast();

            return this;
        },

        generateOrderItemBemjson: function (data) {
            return {
                block: 'order',
                elem: 'add-to-order-modal-item',
                tag: 'tr',
                content: [
                    {
                        tag: 'td',
                        content: {
                            block: 'order',
                            elem: 'add-to-order-modal-item-title',
                            content: data.productName + ', ' + data.color.name + (data.size ? ', ' + data.size : '')
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'counter',
                            mods: {'item-counter': true},
                            mix: {
                                block: 'order',
                                elem: 'add-to-order-modal-counter'
                            },
                            val: data.number
                        }
                    },
                    {
                        tag: 'td',
                        content: {
                            block: 'input',
                            mods: {disabled: true},
                            mix: {
                                block: 'order',
                                elem: 'add-to-order-modal-price'
                            },
                            val: data.price
                        }
                    },
                    {
                        tag: 'td',
                        content: {block: 'item-deleter'}
                    }
                ]
            };
        },

        addToOrderContinueControlClickHandler: function () {
            this.addToOrderModal.delMod('visible');
        },

        clearOrderHandler: function () {
            this
                .deleteOrderItems()
                .reCalcCoast()
                .addToOrderModal.delMod('visible');
        },

        checkoutControlClickHandler: function () {
            this.addToOrderModal.delMod('visible');

            channel('order').emit('checkout');
        },

        reCalcCoast: function () {
            var coast = this.getOrderCoast();
            var number = this.getOrderItems().length;
            var itemName = this.getItemNameByNumber(number);

            this.elem('add-to-order-modal-coast-value').text(coast + ' ₽');

            if (number) {
                this.elem('modalOpener').text('В заказе ' + number + ' ' + itemName + ' на ' + coast + ' ₽');
            } else {
                this.elem('modalOpener').text('');
            }

            return this;
        },

        getOrderCoast: function () {
            var coast = 0;
            var items = this.getOrderItems();

            if (!items.length) {
                return coast;
            }

            items.forEach(function (item) {
                coast += item.number * item.price;
            });

            return coast;
        },

        changeItemNumberHandler: function (e, data) {
            var items = this.getOrderItems();

            if (!items.length) {
                return this;
            }

            items[data.itemId].number = data.val;

            localStorage.setItem('order:items', JSON.stringify(items));

            this.reCalcCoast();

            return this;
        },

        getItemNameByNumber: function (number) {
            var itemName = 'товаров';

            if (number === 1) {
                itemName = 'товар';
            } else if (number > 1 && number < 5) {
                itemName = 'товара';
            }

            return itemName;
        }
    });

    provide(BEMDOM);

});
