'use strict';

modules.define('color-picker',
['i-bem__dom', 'events__channels', 'jquery'],
function (provide, BEMDOM, channel, $) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.$colors = this.elem('color');

                    this.pickColor(this.$colors.eq(0));

                    this.bindTo('color', 'click', this.colorClickHandler);
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
                            .elem('pickedColor').text('— "' + title + '"');

                        this.pickedColor = {
                            title: title,
                            code: code,
                            isLaminate: !elem.data('no-laminate'),
                            isOnRequest: this.hasMod(elem, 'size', 's')
                        };

                        channel('color-picker').emit('colorChange', this.pickedColor);
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

        colorClickHandler: function (e) {
            var $color = $(e.currentTarget);

            this.pickColor($color);
        },

        pickColor: function ($color) {
            this
                .toggleMod($color, 'active')
                .delMod($color, 'inactive');
        },

        pickedColor: null
    }));

});
