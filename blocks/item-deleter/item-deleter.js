'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'jquery'],
function (provide, channel, $, BEMDOM) {

    BEMDOM.decl('item-deleter', {}, {
        live: function () {
            this.liveBindTo('click', function () {
                var itemId = this
                    .domElem
                    .closest('.order__add-to-order-modal-item')
                    .index();

                channel('order').emit('delete-item', itemId);
            });
        }
    });

    provide(BEMDOM);

});
