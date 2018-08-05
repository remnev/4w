'use strict';

modules.define('color-picker',
['i-bem__dom', 'events__channels', 'jquery', 'location', 'bh', 'uri', 'next-tick'],
function(provide, BEMDOM, channel, $, location, bh, Uri, nextTick) {
    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            'js': {
                inited: function() {
                    this.coatingType = this.findBlockOn('coating-type', 'radio-group');
                    this.selects = {
                        'picker-renolit': this.findBlockOn('picker-renolit', 'select'),
                        'picker-ral': this.findBlockOn('picker-ral', 'select'),
                    };

                    if (this.hasMod('picked', true)) {
                        nextTick(function() {
                            this.emitColorChange();
                        }.bind(this));
                    }

                    this.coatingType.on('change', this.onCoatingTypeChange, this);
                    this.selects['picker-renolit'].on('change', this.onPickerRenolitChange, this);
                    this.selects['picker-ral'].on('change', this.onPickerRalChange, this);
                },
            },
            'picked': {
                'true': function() {
                    this.changePickedColorDescription();

                    this.emitColorChange();
                },
                '': function() {
                    BEMDOM.destruct(this.findElem('picked-color-description'), true);

                    channel('color-picker').emit('colorClear');
                },
            },
            'visible-picker': {
                'pure-pvc': function() {
                    BEMDOM.replace(this.findElem('color'), bh.apply({
                        block: 'color-picker',
                        elem: 'color',
                        mods: {type: 'pure-pvc'},
                    }));
                },
            },
        },

        onCoatingTypeChange: function() {
            var val = this.coatingType.getVal();
            var isPurePVC = val === 'pure-pvc';

            this.selects['picker-renolit'].setVal(null);
            this.selects['picker-ral'].setVal(null);

            this.reflectCoatingTypeInUrl(val, this.params.productSlug);

            this.setMod('visible-picker', val);
            this.togglePicked(isPurePVC);
        },

        onPickerRenolitChange: function() {
            var val = this.selects['picker-renolit'].getVal();
            var isVal = Boolean(val);
            var pickedColor = this.params.colors.renolit.filter(function(colorData) {
                return colorData.code === val;
            })[0];

            this.togglePicked(isVal);

            if (isVal) {
                BEMDOM.replace(this.findElem('color'), bh.apply({
                    block: 'color-picker',
                    elem: 'color',
                    mods: {type: 'renolit'},
                    data: pickedColor,
                }));
            }

            this.reflectColorInUrl(pickedColor);
        },

        onPickerRalChange: function() {
            var val = this.selects['picker-ral'].getVal();
            var isVal = Boolean(val);
            var pickedColor = {
                code: val,
                hex: this.params.colors.ral[val],
            };

            this.togglePicked(isVal);

            if (isVal) {
                BEMDOM.replace(this.findElem('color'), bh.apply({
                    block: 'color-picker',
                    elem: 'color',
                    mods: {type: 'ral'},
                    data: pickedColor,
                }));
            }

            this.reflectColorInUrl(pickedColor);
        },

        reflectCoatingTypeInUrl: function(coatingType, productSlug) {
            var url = Uri.parse(window.location);

            url.setPath(['products', productSlug, coatingType, ''].join('/'));

            location.change({url: url.toString()});
        },

        reflectColorInUrl: function(color) {
            var url = Uri.parse(window.location);

            if (Object(color).code) {
                url.replaceParam('color', color.code);
            } else {
                url.deleteParam('color');
            }

            location.change({url: url.toString()});
        },

        changePickedColorDescription: function() {
            var coatingType = this.coatingType.getVal();

            BEMDOM.replace(this.findElem('picked-color-description'), bh.apply({
                block: 'color-picker',
                elem: 'picked-color-description',
                mods: {type: coatingType},
                data: this.getColorDescriptionData(coatingType),
            }));
        },

        getColorDescriptionData: function(coatingType) {
            var data = {};
            var coating = this.params.coating.filter(function(coatingData) {
                return coatingData.name === coatingType;
            })[0];

            if (coatingType === 'pure-pvc') {
                data = {coating: coating};
            } else if (coatingType === 'renolit') {
                var colorRenolit = this.selects['picker-' + coatingType].getVal();

                data = {
                    coating: coating,
                    color: this.params.colors.renolit.filter(function(colorData) {
                        return String(colorData.code) === String(colorRenolit);
                    })[0],
                };
            } else if (coatingType === 'ral') {
                var colorRal = this.selects['picker-' + coatingType].getVal();

                data = {
                    coating: coating,
                    color: colorRal,
                };
            }

            return data;
        },

        togglePicked: function(isPicked) {
            this
                .delMod('picked')
                .toggleMod('picked', true, isPicked);
        },

        getPickedColorData: function() {
            var coatingType = this.coatingType.getVal();

            return {
                title: this.getPickedColorTitle(),
                isLaminate: coatingType !== 'pure-pvc',
                isOnRequest: this.getPickedColorIsOnRequest(),
            };
        },

        emitColorChange: function() {
            channel('color-picker').emit('colorChange', this.getPickedColorData());
        },

        getPickedColorTitle: function() {
            var coatingType = this.coatingType.getVal();
            var coating = this.params.coating.filter(function(coatingData) {
                return coatingData.name === coatingType;
            })[0];
            var title = coating.title;

            if (coatingType === 'renolit') {
                var colorCodeRenolit = this.selects['picker-renolit'].getVal();
                var color = this.params.colors.renolit.filter(function(colorData) {
                    return String(colorData.code) === String(colorCodeRenolit);
                })[0];

                title += ' (код ' + color.code + ' "' + color.title + '")';
            } else if (coatingType === 'ral') {
                var colorCodeRal = this.selects['picker-ral'].getVal();

                title += ' (код ' + colorCodeRal + ')';
            }

            return title;
        },

        getPickedColorIsOnRequest: function() {
            var coatingType = this.coatingType.getVal();

            if (coatingType === 'renolit') {
                var colorPicked = this.selects['picker-renolit'].getVal();

                return !this.params.colors.renolitAvailable.some(function(colorOnRequest) {
                    return colorOnRequest.code === colorPicked;
                });
            }

            if (coatingType === 'ral') {
                return true;
            }

            return false;
        },
    }));
});
