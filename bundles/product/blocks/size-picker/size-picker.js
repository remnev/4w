'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'location', 'next-tick'],
function (provide, channel, location, nextTick, BEMDOM) {

    BEMDOM.decl('size-picker', {
        onSetMod: {
            js: {
                inited: function () {
                    this.radioGroup = this.findBlockInside('radio-group');

                    this.radioGroup.on('change', this.sizeChangeHandler, this);

                    if (this.radioGroup.getVal()) {
                        nextTick(function () {
                            this.radioGroup.emit('change');
                        }.bind(this));
                    }
                }
            }
        },

        sizeChangeHandler: function () {
            var val = JSON.parse(this.radioGroup.getVal());

            this
                .setMod('picked')
                .elem('pickedSize').text('— ' + val.size.value + val.size.units);

            channel('size-picker').emit('sizeChange', val);

            location.change({
                params: {size: val.size.value}
            });
        }
    });

    provide(BEMDOM);

});
