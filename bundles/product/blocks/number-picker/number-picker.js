'use strict';

modules.define('number-picker',
['i-bem__dom', 'events__channels', 'functions__debounce'],
function (provide, BEMDOM, channel, debounce) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this.filter = this.findBlockOutside('filter');
                    this.counter = this.findBlockInside('counter');
                    this.colorPicker = this.filter.findBlockInside('color-picker');
                    this.price = this.elem('price').bem('input');
                    this.coast = this.elem('coast').bem('input');
                    this.orderDesc = this.elem('order-description');
                    this.submitButton = this.findBlockOn('submit', 'button');

                    this.pickedColor = this.colorPicker ? this.colorPicker.pickedColor : null;
                    this.pickedArticle = this.filter.params.singleArticle;
                    this.pickedNumber = 1;
                    this.priceVal = 0;

                    if (this.pickedColor || this.pickedArticle) {
                        this
                            .updatePrice()
                            .updateOrderDescription();
                    }

                    this.counter.on('change', this.numberChangeHandler, this);
                    this.submitButton.on('click', debounce(this.submitButtonClickHandler, 100, false, this));

                    channel('color-picker').on('colorChange', this.colorChangeHandler, this);
                    channel('color-picker').on('colorClear', this.colorClearHandler, this);
                    channel('size-picker').on('sizeChange', this.sizeChangeHandler, this);
                }
            },
            picked: function (modName, modVal) {
                this.submitButton.toggleMod('disabled', true, !modVal);
            }
        },

        numberChangeHandler: function () {
            this.pickedNumber = this.counter.getVal();

            this
                .updatePrice()
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
            var priceType;
            var inputValue;

            if (this.colorPicker && !this.pickedColor || !this.pickedArticle) {
                return this;
            }

            if (this.pickedColor) {
                priceType = this.pickedColor.isLaminate ? 'laminate' : 'pure';
            } else {
                priceType = 'pure';
            }

            this.priceVal = this.pickedArticle.price[priceType];

            inputValue = Math.floor(this.priceVal - this.calculateDiscount(this.priceVal, priceType));
            this.price.setVal(inputValue);

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

            if (this.pickedColor) {
                color.text('Цвет ' + this.pickedColor.title);

                if (this.pickedColor.isLaminate) {
                    laminate.text('Ламинированный');
                } else {
                    laminate.text('Неламинированный');
                }
            }

            if (this.pickedArticle &&
                this.pickedArticle.size &&
                this.pickedArticle.size.value &&
                this.pickedArticle.size.units) {
                size.text('Размеры ' + this.pickedArticle.size.value + this.pickedArticle.size.units);
            }

            item.text(this.params.productName);
            number.text('В количестве ' + this.pickedNumber + ' шт');
            coast.text('На сумму ' + this.coast.getVal() + ' ₽');

        },

        submitButtonClickHandler: function () {
            var data = {
                productName: this.params.productName,
                productSlug: this.params.productSlug,
                ttd: this.params.productTtd.available,
                size: this.pickedArticle.size ? this.pickedArticle.size.value + this.pickedArticle.size.units : null,
                number: this.pickedNumber,
                price: this.priceVal,
                discount: this.params.productDiscount,
                articleName: this.pickedArticle.name
            };

            if (this.pickedColor) {
                data.color = {
                    name: this.pickedColor.title
                };

                data.isLaminate = this.pickedColor.isLaminate;

                // picked color available only on request
                if (this.pickedColor.isOnRequest) {
                    data.ttd = this.params.productTtd.onRequest;
                }
            }

            channel('number-picker').emit('submitClick', data);
        },

        calculateDiscount: function (basePrice, priceType) {
            var number = this.counter.getVal();
            var discountData = this.params.productDiscount;
            var baseDiscount = basePrice * 0.01 * discountData.base[priceType];
            var numberDiscount = 0;

            if (number >= discountData.number[priceType].number) {
                numberDiscount = basePrice * 0.01 * discountData.number[priceType].value;
            }

            return baseDiscount + numberDiscount;
        }
    }));

});
