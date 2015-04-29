'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'jquery'],
function (provide, channel, $, BEMDOM) {

    BEMDOM.decl({block: 'counter', modName: 'item-counter'}, {}, {
        live: function () {
            this
                .liveInitOnEvent('increase decrease', 'pointerover')
                .liveBindTo('increase decrease', 'click', function () {
                    var itemId;
                    var data;

                    if (!this.hasMod('item-counter')) {
                        return;
                    }

                    itemId = this
                        .domElem
                        .closest('.order__add-to-order-modal-item')
                        .index();
                    data = {
                        itemId: itemId,
                        val: this.getVal()
                    };

                    channel('order').emit('change-item-number', data);
                });
        }
    });

    provide(BEMDOM);

});
