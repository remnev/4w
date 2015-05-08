'use strict';

modules.define(
'i-bem__dom',
['jquery', 'events__channels'],
function (provide, $, channel, BEMDOM) {

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
                        var title = elem.data('title');
                        var code = elem.data('code');

                        this
                            .delMod(this.$colors, 'active')
                            .setMod(this.$colors, 'inactive')
                            .setMod('picked')
                            .elem('pickedColor').text('— арт. ' + code + ' "' + title + '"');

                        channel('color-picker').emit('colorChange', {
                            title: title,
                            code: code,
                            isLaminate: elem.data('no-laminate') == true,
                            isMainColor: this.hasMod(elem, 'size', 'l')
                        });
                    },
                    '': function () {
                        this
                            .delMod(this.$colors, 'inactive')
                            .delMod('picked')
                            .elem('pickedColor').empty();

                        channel('color-picker').emit('colorClear');
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
