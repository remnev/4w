'use strict';

modules.define(
'i-bem__dom',
['events__channels'],
function (provide, channel, BEMDOM) {

    BEMDOM.decl('size-picker', {
        onSetMod: {
            js: {
                inited: function () {
                    this.radioGroup = this.findBlockInside('radio-group');

                    this.radioGroup.on('change', this.sizeChangeHandler, this);
                }
            }
        },

        sizeChangeHandler: function () {
            var val = JSON.parse(this.radioGroup.getVal());

            this
                .setMod('picked')
                .elem('pickedSize').text('— ' + val.size.value + val.size.units);

            channel('size-picker').emit('sizeChange', val);
        }
    });

    provide(BEMDOM);

});
