'use strict';

modules.define(
'i-bem__dom',
['jquery'],
function (provide, $, BEMDOM) {

BEMDOM.decl('color-picker', {
    onSetMod: {
        js: {
            inited: function () {
                this.$colors = this.elem('color');

                this.bindTo('color', 'click', this.pickColor);
            }
        }
    },

    onElemSetMod: {
        color: {
            active: {
                true: function (elem) {
                    this
                        .delMod(this.$colors, 'active')
                        .setMod(this.$colors, 'inactive')
                        .elem('pickedColor').text('— арт. ' + elem.data('code') + ' "' + elem.data('title') + '"');
                },
                '': function () {
                    this
                        .delMod(this.$colors, 'inactive')
                        .elem('pickedColor').empty();
                }
            }
        }
    },

    pickColor: function (e) {
        this
            .toggleMod($(e.currentTarget), 'active')
            .delMod($(e.currentTarget), 'inactive');
    }
});

provide(BEMDOM);

});
