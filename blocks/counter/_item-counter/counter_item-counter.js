'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'jquery'],
function (provide, channel, $, BEMDOM) {

    BEMDOM.decl({block: 'counter', modName: 'item-counter'}, {
        onSetMod: {
            js: {
                inited: function () {
                    this.__base.apply(this, arguments);

                    this.input.emit('change');
                }
            }
        },

        inputChangeHandler: function () {
            var itemId;
            var data;

            this.__base.apply(this, arguments);

            itemId = this
                .domElem
                .closest('.order__add-to-order-modal-item')
                .index();
            data = {
                itemId: itemId,
                val: this.getVal()
            };

            channel('order').emit('change-item-number', data);
        }
    }, {
        live: function () {
            this
                .liveInitOnEvent('pointerover')
                .liveInitOnBlockInsideEvent('change', 'input');
        }
    });

    provide(BEMDOM);

});
