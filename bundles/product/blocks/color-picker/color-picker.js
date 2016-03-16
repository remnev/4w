'use strict';

modules.define('color-picker',
['i-bem__dom', 'events__channels', 'jquery', 'location'],
function (provide, BEMDOM, channel, $, location) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.$colors = this.elem('color');

                    this._pickColorOnInit();

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

            // reflect state in the URI
            if (this.findElem('color', 'active', true).length) {
                this._setQueryParam(this.getMod($color, 'color-type'));
            } else {
                this._delQueryParam();
            }
        },

        pickColor: function ($color) {
            this
                .toggleMod($color, 'active')
                .delMod($color, 'inactive');
        },

        _pickColorOnInit: function () {
            var $pureColors = this.elem('color', 'color-type', 'pure');
            var $laminateColors = this.elem('color', 'color-type', 'laminate');
            var colorToPick;

            if (this.params.colorType === 'pure') {
                colorToPick = $pureColors.eq(0)
            } else if (this.params.colorType === 'laminate') {
                colorToPick = $laminateColors.eq(0);
            }

            if (!colorToPick) {
                return;
            }

            this.pickColor(colorToPick);
        },

        _setQueryParam: function (colorType) {
            location.change({
                params: {
                    'color-type': colorType
                }
            });

            return this;
        },

        _delQueryParam: function () {
            var query = location.getUri().queryParams;

            delete query['color-type'];

            location.change({
                params: query,
                forceParams: true
            });

            return this;
        },

        pickedColor: null
    }));

});
