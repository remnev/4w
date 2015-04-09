'use strict';

modules.define(
'i-bem__dom',
['jquery'],
function (provide, $, BEMDOM) {

    BEMDOM.decl('photo-slider', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('thumbnail', 'click', this.setCurrent);
                }
            }
        },

        setCurrent: function (e) {
            var current = $(e.currentTarget)
                .clone()
                .removeClass('photo-slider__thumbnail');

            BEMDOM.update(this.elem('current'), current);
        }
    });

    provide(BEMDOM);

});
