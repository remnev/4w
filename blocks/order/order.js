'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'bh', 'jquery'],
function (provide, channel, bh, $, BEMDOM) {

    BEMDOM.decl('order', {
        onSetMod: {
            js: {
                inited: function () {
                    var addToOrderModalBemjson = bh.apply({
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
                                            elem: 'add-to-order-modal-issue-control'
                                        },
                                        text: 'Оформить'
                                    }
                                ]
                            }
                        ]
                    });

                    BEMDOM.append(this.domElem, addToOrderModalBemjson);

                    this.addToOrderModal = this.elem('add-to-order-modal').bem('modal');
                    this.addToOrderModalItems = this.elem('add-to-order-modal-items');
                    this.addToOrderContinueControl = this.elem('add-to-order-modal-continue-control');

                    this.bindTo(this.addToOrderContinueControl, 'click', this.addToOrderContinueControlClickHandler);

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
            this.deleteOrderItem(data)
                .showAddToOrderModal();
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
            return JSON.parse(localStorage.getItem('order:items'));
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
                            content: data.productName + ', ' + data.color + ', ' + data.size
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

        reCalcCoast: function () {
            var coast = 0;

            this.getOrderItems().forEach(function (item) {
                coast += item.number * item.price;
            });

            this.elem('add-to-order-modal-coast-value').text(coast + ' руб.');

            return this;
        },

        changeItemNumberHandler: function (e, data) {
            var items = this.getOrderItems();

            if (!items.length) {
                return this;
            }

            items[data.itemId].number = data.val;

            localStorage.setItem('order:items', JSON.stringify(items));

            this.showAddToOrderModal();

            return this;
        }
    });

    provide(BEMDOM);

});
