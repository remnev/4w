'use strict';

modules.define(
'i-bem__dom',
['events__channels'],
function (provide, channel, BEMDOM) {

    BEMDOM.decl('number-picker', {
        onSetMod: {
            js: {
                inited: function () {
                    this.filter = this.findBlockOutside('filter');
                    this.counter = this.findBlockInside('counter');
                    this.price = this.elem('price').bem('input');
                    this.coast = this.elem('coast').bem('input');
                    this.orderDesc = this.elem('order-description');
                    this.submit = this.elem('submit');

                    this.pickedColor = null;
                    this.pickedArticle = this.filter.params.singleArticle;
                    this.pickedNumber = 1;

                    this.counter.on('change', this.numberChangeHandler, this);
                    this.bindTo(this.submit, 'click', this.submitClickHandler);

                    channel('color-picker').on('colorChange', this.colorChangeHandler, this);
                    channel('color-picker').on('colorClear', this.colorClearHandler, this);
                    channel('size-picker').on('sizeChange', this.sizeChangeHandler, this);
                }
            },
            picked: function () {
                this.toggleMod(this.submit, 'active');
            }
        },

        numberChangeHandler: function () {
            this.pickedNumber = this.counter.getVal();

            this
                .updateCoast()
                .updateOrderDescription();
        },

        sizeChangeHandler: function (e, data) {
            this.pickedArticle = data;

            this
                .updatePrice()
                .updateOrderDescription();
        },

        colorChangeHandler: function (e, data) {
            this.pickedColor = data;

            this
                .updatePrice()
                .updateOrderDescription();
        },

        colorClearHandler: function () {
            this
                .clearPrice()
                .updateOrderDescription();
        },

        updatePrice: function () {
            var price;

            if (!this.pickedColor || !this.pickedArticle) {
                return this;
            }

            price = this.pickedArticle.price[this.pickedColor.isLaminate ? 'laminate' : 'pure'];

            this.price.setVal(price);

            this.updateCoast();

            return this;
        },

        clearPrice: function () {
            this.pickedColor = null;

            this.price.setVal('');

            this.updateCoast();

            return this;
        },

        updateCoast: function () {
            var number = this.counter.getVal();
            var price = this.price.getVal();
            var coast = number * price;

            this.coast.setVal(coast);

            if (coast > 0) {
                this
                    .setMod('picked')
                    .delMod(this.orderDesc, 'hidden');
            } else {
                this
                    .delMod('picked')
                    .setMod(this.orderDesc, 'hidden');
            }

            return this;
        },

        updateOrderDescription: function () {
            var item = this.elem('order-description-item');
            var laminate = this.elem('order-description-laminate');
            var color = this.elem('order-description-color');
            var size = this.elem('order-description-size');
            var number = this.elem('order-description-number');
            var coast = this.elem('order-description-coast');

            if (!this.pickedColor || !this.pickedArticle) {
                return;
            }

            item.text(this.params.productName);
            color.text('Цвет ' + this.pickedColor.title + ' (' + this.pickedColor.code + ')');
            if (this.pickedArticle.size) {
                size.text('Размеры ' + this.pickedArticle.size.value + this.pickedArticle.size.units);
            }
            number.text('В количестве ' + this.pickedNumber + 'шт');
            coast.text('На сумму ' + this.coast.getVal() + '₽');

            if (this.pickedColor.isLaminate) {
                laminate.text('Ламинированный');
            } else {
                laminate.text('Неламинированный');
            }
        },

        submitClickHandler: function () {
            var data;

            if (!this.hasMod(this.submit, 'active')) {
                return;
            }

            data = {
                productName: this.params.productName,
                color: this.pickedColor.title + ' (' + this.pickedColor.code + ')',
                size: this.pickedArticle.size ? this.pickedArticle.size.value + this.pickedArticle.size.units : null,
                number: this.pickedNumber,
                price: this.price.getVal()
            };

            channel('number-picker').emit('submitClick', data);
        }
    });

    provide(BEMDOM);

});
