'use strict';

modules.define('checkouter',
['i-bem__dom', 'events__channels', 'bh', 'jquery'],
function (provide, BEMDOM, channel, bh, $) {

    provide(BEMDOM.decl(this.name, {
        deliveryDateAnotherValue: '',
        deliveryDateValue: '',
        deliveryAddress: '',
        buyerNameValue: '',
        phoneValue: '',
        emailValue: '',
        typeOfGetting: 'dim',
        typeOfPayment: 'cache',

        onSetMod: {
            js: {
                inited: function () {
                    channel('order').on('checkout', this.checkoutHandler, this);
                }
            }
        },

        checkoutHandler: function () {
            var addressPlaceholders = {
                dim: 'Улица, дом, подъезд',
                cym: '',
                dbtc: 'Город'
            };
            var deliveryDateTitles = {
                dim: 'Дата доставки',
                cym: 'Дата самовывоза',
                dbtc: 'Дата отгрузки в ТК'
            };
            var closestDateToDeliver = this.getClosestDateToDeliver();
            var bemjson = {
                block: 'checkouter',
                elem: 'modal',
                typeOfGetting: this.typeOfGetting,
                typeOfGettingOptions: this.getTypeOfGettingOptions(),
                typeOfPayment: this.typeOfPayment,
                typeOfPaymentOptions: this.getTypeOfPaymentOptions(),
                deliveryDateTitles: deliveryDateTitles,
                closestDateToDeliver: closestDateToDeliver,
                addressPlaceholders: addressPlaceholders
            };

            BEMDOM.update(this.domElem, bh.apply(bemjson));

            this.addressTr = this.findElem('address-tr');
            this.address = this.findElem('address-input');
            this.addressInput = this.findElem('address-input').bem('input');
            this.addressPlaceholders = addressPlaceholders;
            this.modal = this.findElem('modal').bem('modal');
            this.typeOfGettingRG = this.findElem('type-of-getting').bem('radio-group');
            this.typeOfPaymentRG = this.findElem('type-of-payment').bem('radio-group');
            this.deliveryDateTd = this.findElem('delivery-date-td');
            this.deliveryDateSelect = this.findElem('delivery-date').bem('select');
            this.deliveryDateTitles = deliveryDateTitles;
            this.deliveryDateAnother = this.findElem('delivery-date-another');
            this.deliveryDateAnotherInput = this.findElem('delivery-date-another').bem('input');
            this.buyerName = this.findElem('buyer-name-input');
            this.buyerNameInput = this.findElem('buyer-name-input').bem('input');
            this.phone = this.findElem('phone-input');
            this.phoneInput = this.findElem('phone-input').bem('input');
            this.email = this.findElem('email-input');
            this.emailInput = this.findElem('email-input').bem('input');
            this.commentaryTextarea = this.findElem('commentary-textarea').bem('textarea');
            this.nextButton = this.findElem('next').bem('button');
            this.closeModalElem = this.findElem('close-modal');
            this.backToOrder = this.findElem('back-to-order');

            this.deliveryDateValue = closestDateToDeliver;

            this.bindTo(this.closeModalElem, 'click', this.closeModal);
            this.bindTo(this.backToOrder, 'click', this.returnToOrder);
            this.nextButton.bindTo('click', this.showConfirmOrderModal.bind(this));

            this.typeOfGettingRG.on('change', this.typeOfGettingRGChangeHandler, this);
            this.typeOfPaymentRG.on('change', this.typeOfPaymentRGChangeHandler, this);
            this.deliveryDateSelect.on('change', this.deliveryDateChange, this);
            this.deliveryDateAnotherInput
                .on('change', this.deliveryDateAnotherInputChange, this)
                .bindTo('control', 'blur', $.proxy(this.deliveryDateAnotherInputBlur, this));
            this.addressInput.bindTo('control', 'blur', $.proxy(this.addressInputBlur, this));
            this.buyerNameInput.bindTo('control', 'blur', $.proxy(this.buyerNameInputBlur, this));
            this.phoneInput.bindTo('control', 'blur', $.proxy(this.phoneInputBlur, this));
            this.emailInput.bindTo('control', 'blur', $.proxy(this.emailInputBlur, this));

            this.modal.setMod('visible');
        },

        closeModal: function () {
            this.modal.delMod('visible');

            return this;
        },

        typeOfPaymentRGChangeHandler: function () {
            this.typeOfPayment = this.typeOfPaymentRG.getVal();
        },

        typeOfGettingRGChangeHandler: function () {
            var disabledRadio;
            var typeOfGetting = this.typeOfGetting = this.typeOfGettingRG.getVal();

            if (typeOfGetting === 'dbtc') {
                this.typeOfPaymentRG
                    .setVal('cc')
                    .findBlocksInside('radio')
                    .filter(function (radio) {
                        return radio.getVal() === 'cache';
                    })[0]
                    .setMod('disabled');
            } else {
                disabledRadio = this.typeOfPaymentRG
                    .findBlockInside({block: 'radio', modName: 'disabled', modVal: true});

                if (disabledRadio) {
                    disabledRadio.delMod('disabled');
                }
            }

            if (this.typeOfGettingRG.getVal() === 'cym') {
                this
                    .setMod(this.addressTr, 'invisible')
                    .deliveryAddress = '';
            } else {
                this
                    .delMod(this.addressTr, 'invisible')
                    .deliveryAddress = this.addressInput.getVal();
            }

            this.addressInput.findElem('control').attr('placeholder', this.addressPlaceholders[typeOfGetting]);

            this.deliveryDateTd.text(this.deliveryDateTitles[typeOfGetting]);
        },

        getClosestDateToDeliver: function () {
            var orderItems = this.findBlockOutside('page').findBlockInside('order').getOrderItems();
            var maxRemainingTimeForItem = 1; // in days

            orderItems.forEach(checkMaxTtd);

            return moment()
                .locale('ru')
                .add(maxRemainingTimeForItem, 'd')
                .format('DD MMMM YYYY');

            function checkMaxTtd(item) {
                if (item.ttd > maxRemainingTimeForItem) {
                    maxRemainingTimeForItem = item.ttd;
                }
            }
        },

        deliveryDateChange: function () {
            var val = this.deliveryDateSelect.getVal();

            if (val === 'another') {
                this.delMod(this.deliveryDateAnother, 'hidden');

                this.deliveryDateValue = '';

                return;
            }

            this
                .setMod(this.deliveryDateAnother, 'hidden')
                .checkInputs();

            this.deliveryDateValue = val;
        },

        /* eslint-disable complexity, no-fallthrough */
        deliveryDateAnotherInputChange: function () {
            var val = this.deliveryDateAnotherInput.getVal();

            switch (val.length) {
                case 0:
                    this.deliveryDateAnotherValue = '';

                    return;
                case 1:
                    if (/^\d$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 2:
                    if (/^\d{2}$/.test(val)) {
                        if (this.deliveryDateAnotherValue.length === 1) {
                            this.deliveryDateAnotherInput.setVal(val + '.');
                        }

                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 3:
                    if (/^\d{2}\.$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 4:
                    if (/^\d{2}\.\d$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 5:
                    if (/^\d{2}\.\d{2}$/.test(val)) {
                        if (this.deliveryDateAnotherValue.length === 4) {
                            this.deliveryDateAnotherInput.setVal(val + '.');
                        }

                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 6:
                    if (/^\d{2}\.\d{2}\.$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 7:
                    if (/^\d{2}\.\d{2}\.\d$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 8:
                    if (/^\d{2}\.\d{2}\.\d{2}$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 9:
                    if (/^\d{2}\.\d{2}\.\d{3}$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                case 10:
                    if (/^\d{2}\.\d{2}\.\d{4}$/.test(val)) {
                        this.deliveryDateAnotherValue = val;

                        return;
                    }

                default:
            }

            this.deliveryDateAnotherInput.setVal(this.deliveryDateAnotherValue);

            this.checkInputs();
        },
        /* eslint-enable complexity, no-fallthrough */

        deliveryDateAnotherInputBlur: function () {
            var val = this.deliveryDateAnotherInput.getVal();

            if (/\d{2}\.\d{2}\.\d{4}/.test(val) || val === '') {
                this.deliveryDateAnotherValue = val;

                this.delMod(this.deliveryDateAnother, 'wrong');

                return;
            }

            this.deliveryDateAnotherValue = '';
            this
                .setMod(this.deliveryDateAnother, 'wrong')
                .checkInputs();
        },

        addressInputBlur: function () {
            var val = this.addressInput.getVal();

            this.deliveryAddress = val;

            if (val === '') {
                this.setMod(this.address, 'wrong');
            } else {
                this.delMod(this.address, 'wrong');
            }

            this.checkInputs();
        },

        buyerNameInputBlur: function () {
            var val = this.buyerNameInput.getVal();

            this.buyerNameValue = val;

            if (val === '') {
                this.setMod(this.buyerName, 'wrong');
            } else {
                this.delMod(this.buyerName, 'wrong');
            }

            this.checkInputs();
        },

        phoneInputBlur: function () {
            var val = this.phoneInput.getVal();

            if (val === '' || val.length < 5 || !/\d/.test(val)) {
                this.setMod(this.phone, 'wrong');
            } else {
                this.phoneValue = val;

                this.delMod(this.phone, 'wrong');
            }

            this.checkInputs();
        },

        emailInputBlur: function () {
            var val = this.emailInput.getVal();

            if (val === '' || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val)) {
                this.setMod(this.email, 'wrong');
            } else {
                this.emailValue = val;

                this.delMod(this.email, 'wrong');
            }

            this.checkInputs();
        },

        returnToOrder: function () {
            this
                .closeModal()
                .findBlockOutside('page')
                .findBlockInside('order')
                .addToOrderModal
                .setMod('visible');
        },

        checkInputs: function () {
            var typeOfGetting = this.typeOfGettingRG.getVal();

            if (typeOfGetting === 'cym'
                && (this.deliveryDateValue || this.deliveryDateAnotherValue)
                && this.buyerNameValue
                && this.phoneValue
                && this.emailValue) {

                this.nextButton.delMod('disabled');

                return;
            }

            if ((this.deliveryDateValue || this.deliveryDateAnotherValue)
                && this.deliveryAddress
                && this.buyerNameValue
                && this.phoneValue
                && this.emailValue) {

                this.nextButton.delMod('disabled');

                return;
            }

            this.nextButton.setMod('disabled');
        },

        showConfirmOrderModal: function () {
            this.closeModal();

            channel('order').emit('confirm');
        },

        getPickedParams: function () {
            var pickedParams = [
                {
                    title: 'Общая стоимость (руб.)',
                    value: this
                        .findBlockOutside('page')
                        .findBlockInside('order')
                        .getOrderCoast() + (this.typeOfGettingRG.getVal() === 'dim' ? 500 : 0)
                },
                {
                    title: 'Получение товара',
                    value: this
                        .getTypeOfGettingOptions()
                        .filter(function (option) {
                            if (option.val === this.typeOfGetting) {
                                return true;
                            }
                        }, this)[0]
                        .text
                },
                {
                    title: 'Оплата',
                    value: this
                        .getTypeOfPaymentOptions()
                        .filter(function (option) {
                            if (option.val === this.typeOfPaymentRG.getVal()) {
                                return true;
                            }
                        }, this)[0]
                        .text
                },
                {
                    title: 'Дата доставки/самовывоза',
                    value: (this.deliveryDateValue || this.deliveryDateAnotherValue)
                        .toLocaleString('ru', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                },
                this.deliveryAddress ? {
                    title: 'Адрес доставки',
                    value: this.deliveryAddress
                } : null,
                {
                    title: 'Имя получателя',
                    value: this.buyerNameValue
                },
                {
                    title: 'Мобильный телефон',
                    value: this.phoneValue
                },
                {
                    title: 'Электронная почта',
                    value: this.emailValue
                },
                {
                    title: 'Комментарий к заказу',
                    value: this.commentaryTextarea.getVal()
                }

            ];

            return $.grep(pickedParams, function (item) {
                // filter a holes
                return item;
            });
        },

        getTypeOfGettingOptions: function () {
            return [
                {
                    val: 'dim',
                    text: 'Доставка по Москве'
                },
                {
                    val: 'cym',
                    text: 'Самовывоз со склада в Москве'
                },
                {
                    val: 'dbtc',
                    text: 'Доставка транспортной компанией'
                }
            ];
        },

        getTypeOfPaymentOptions: function () {
            return [
                {
                    val: 'cache',
                    text: 'Наличные'
                },
                {
                    val: 'cc',
                    text: 'Пластиковая карта'
                },
                {
                    val: 'uncache',
                    text: 'Безнал (запрос счета)'
                }
            ];
        }
    }));

});
