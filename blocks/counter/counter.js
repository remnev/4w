'use strict';

modules.define(
'i-bem__dom',
[],
function(provide, BEMDOM) {
    BEMDOM.decl('counter', {
        previousValue: 1,

        onSetMod: {
            js: {
                inited: function() {
                    this.input = this.findBlockInside('input');

                    this.bindTo('decrease', 'click', this.decreaseVal);
                    this.bindTo('increase', 'click', this.increaseVal);

                    this.input
                        .on('change', this.inputChangeHandler, this)
                        .bindTo('control', 'focus', this.inputFocusHandler);
                },
            },
        },

        decreaseVal: function() {
            var val = this.getVal();

            if (val > 1) {
                this.setVal(val - 1);
            }
        },

        increaseVal: function() {
            var val = this.getVal();

            this.setVal(val + 1);
        },

        getVal: function() {
            return parseInt(this.input.getVal(), 10);
        },

        setVal: function(val) {
            this.input.setVal(val);

            this.emit('change');

            return this;
        },

        inputChangeHandler: function() {
            var val = this.getVal();

            if (isNaN(val) || val < 1) {
                this.setVal(this.previousValue);

                return;
            }

            this.setVal(val);

            this.previousValue = val;
        },

        inputFocusHandler: function() {
            this.findElem('control').select();
        },
    });

    provide(BEMDOM);
});
