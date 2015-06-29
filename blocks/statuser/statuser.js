'use strict';

modules.define('statuser',
['i-bem__dom', 'events__channels', 'bh', 'jquery'],
function (provide, BEMDOM, channel, bh, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    channel('order').on('send', this.sendHandler, this);
                }
            }
        },

        sendHandler: function () {
            // clean old modals
            if (this.modalTypeSuccess) {
                BEMDOM.destruct(this.modalTypeSuccess.domElem);
            }

            if (this.modalTypeFail) {
                BEMDOM.destruct(this.modalTypeFail.domElem);
            }

            BEMDOM.update(this.domElem, bh.apply({
                block: 'statuser',
                elem: 'modal',
                mods: {type: 'send'}
            }));

            this.modalTypeSend = this.findElem('modal', 'type', 'send').bem('modal');

            this.modalTypeSend.setMod('visible');

            this.orderBlock = this
                .findBlockOutside('page')
                .findBlockInside('order');
            this.checkouterBlock = this
                .findBlockOutside('page')
                .findBlockInside('checkouter');

            $.post('/api/send-order', {
                orderItems: this.orderBlock.getOrderItems(),
                orderParams: this.checkouterBlock.getPickedParams(),
                typeOfGetting: this.checkouterBlock.typeOfGetting,
                email: this.checkouterBlock.emailValue,
                csrf: 'todo'
            })
            .done($.proxy(this._sendDone, this))
            .fail($.proxy(this._sendFail, this));
        },

        _sendDone: function (data) {
            BEMDOM.destruct(this.modalTypeSend.domElem);

            BEMDOM.update(this.domElem, bh.apply({
                block: 'statuser',
                elem: 'modal',
                mods: {type: 'success'},
                orderId: data.orderId,
                buyerEmail: data.buyerEmail
            }));

            this.modalTypeSuccess = this.findElem('modal', 'type', 'success').bem('modal');

            this.bindTo('close', 'click', function () {
                this.modalTypeSuccess.delMod('visible');
            });

            // clean the order
            this.orderBlock.deleteOrderItems();

            this.modalTypeSuccess.setMod('visible');
        },

        _sendFail: function () {
            var retryElem;
            var closeElem;

            BEMDOM.destruct(this.modalTypeSend.domElem);

            BEMDOM.update(this.domElem, bh.apply({
                block: 'statuser',
                elem: 'modal',
                mods: {type: 'fail'}
            }));

            retryElem = this.findElem('retry');
            closeElem = this.findElem('close');

            this.modalTypeFail = this.findElem('modal', 'type', 'fail').bem('modal');

            this.bindTo(retryElem, 'click', this.sendHandler);

            this.bindTo(closeElem, 'click', function () {
                this.modalTypeFail.delMod('visible');
            });

            this.modalTypeFail.setMod('visible');
        }
    }));

});
