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
                closestDateToDeliver: closestDateToDeliver,
                block: 'modal',
                mods: {theme: 'islands'},
                mix: {
                    block: 'checkouter',
                    elem: 'modal'
                },
                content: [
                    {
                        block: 'checkouter',
                        elem: 'title',
                        content: 'Оформление заказа'
                    },
                    {
                        block: 'checkouter',
                        elem: 'table',
                        tag: 'table',
                        content: [
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Получение товара'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'radio-group',
                                            mods: {
                                                theme: 'islands',
                                                size: 's',
                                                type: 'button'
                                            },
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'type-of-getting'
                                            },
                                            val: 'dim',
                                            options: [
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
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Оплата'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'radio-group',
                                            mods: {
                                                theme: 'islands',
                                                size: 's',
                                                type: 'button'
                                            },
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'type-of-payment'
                                            },
                                            val: 'cc',
                                            options: [
                                                {
                                                    val: 'cc',
                                                    text: 'Пластиковая карта'
                                                },
                                                {
                                                    val: 'cache',
                                                    text: 'Наличные'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        elem: 'delivery-date-td',
                                        tag: 'td',
                                        content: deliveryDateTitles.dim
                                    },
                                    {
                                        tag: 'td',
                                        content: [{
                                            block: 'select',
                                            mods: {
                                                mode: 'radio',
                                                theme: 'islands',
                                                size: 's'
                                            },
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'delivery-date'
                                            },
                                            val: closestDateToDeliver,
                                            options: [
                                                {
                                                    val: closestDateToDeliver,
                                                    text: closestDateToDeliver
                                                },
                                                {
                                                    val: this.addNumOfDaysToDate(1, closestDateToDeliver),
                                                    text: this.addNumOfDaysToDate(1, closestDateToDeliver)
                                                },
                                                {
                                                    val: this.addNumOfDaysToDate(2, closestDateToDeliver),
                                                    text: this.addNumOfDaysToDate(2, closestDateToDeliver)
                                                },
                                                {
                                                    val: 'another',
                                                    text: 'Другая дата (позже предложенных)'
                                                }
                                            ]
                                        },
                                        {
                                            block: 'input',
                                            mods: {
                                                theme: 'islands',
                                                size: 's'
                                            },
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'delivery-date-another',
                                                mods: {hidden: true}
                                            },
                                            placeholder: 'ДД.ММ.ГГГГ'
                                        }]
                                    }
                                ]
                            },
                            {
                                elem: 'address-tr',
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Адрес доставки'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'input',
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'address-input'
                                            },
                                            mods: {
                                                theme: 'islands',
                                                size: 's'
                                            },
                                            placeholder: addressPlaceholders.dim
                                        }
                                    }
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Имя получателя'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'input',
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'buyer-name-input'
                                            },
                                            mods: {
                                                theme: 'islands',
                                                size: 's'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Мобильный телефон'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'input',
                                            mods: {
                                                theme: 'islands',
                                                size: 's'
                                            },
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'phone-input'
                                            },
                                            placeholder: '+7 (XXX) XXX-XX-XX'
                                        }
                                    }
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Электронная почта'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'input',
                                            mods: {
                                                theme: 'islands',
                                                size: 's'
                                            },
                                            mix: {
                                                block: 'checkouter',
                                                elem: 'email-input'
                                            },
                                            placeholder: 'name@example.ru'
                                        }
                                    }
                                ]
                            },
                            {
                                tag: 'tr',
                                content: [
                                    {
                                        tag: 'td',
                                        content: 'Комментарий к заказу'
                                    },
                                    {
                                        tag: 'td',
                                        content: {
                                            block: 'textarea',
                                            mods: {
                                                theme: 'islands',
                                                size: 's'
                                            },
                                            attrs: {
                                                rows: 5
                                            },
                                            placeholder: [
                                                'Например, дополнительный номер телефона,',
                                                'особенности проезда и т.д.'
                                            ].join(' ')
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        block: 'checkouter',
                        elem: 'controls',
                        content: [
                            {
                                block: 'button',
                                mods: {
                                    theme: 'islands',
                                    size: 'm',
                                    view: 'pseudo'
                                },
                                mix: {
                                    block: 'checkouter',
                                    elem: 'close-modal'
                                },
                                text: 'Закрыть окно'
                            },
                            {
                                block: 'button',
                                mods: {
                                    theme: 'islands',
                                    size: 'm',
                                    view: 'pseudo'
                                },
                                mix: {
                                    block: 'checkouter',
                                    elem: 'back-to-order'
                                },
                                text: 'Назад к списку товаров'
                            },
                            {
                                block: 'button',
                                mods: {
                                    theme: 'islands',
                                    size: 'm',
                                    view: 'action',
                                    disabled: true
                                },
                                mix: {
                                    block: 'checkouter',
                                    elem: 'next'
                                },
                                text: 'Далее'
                            }
                        ]
                    }
                ]
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
            this.nextButton = this.findElem('next').bem('button');
            this.closeModalElem = this.findElem('close-modal');
            this.backToOrder = this.findElem('back-to-order');

            this.deliveryDateValue = closestDateToDeliver;

            this.bindTo(this.closeModalElem, 'click', this.closeModal);
            this.bindTo(this.backToOrder, 'click', this.returnToOrder);

            this.typeOfGettingRG.on('change', this.typeOfGettingRGChangeHandler, this);
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

        typeOfGettingRGChangeHandler: function () {
            var disabledRadio;
            var typeOfGetting = this.typeOfGettingRG.getVal();

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
                this.setMod(this.addressTr, 'invisible');
            } else {
                this.delMod(this.addressTr, 'invisible');
            }

            this.addressInput.findElem('control').attr('placeholder', this.addressPlaceholders[typeOfGetting]);

            this.deliveryDateTd.text(this.deliveryDateTitles[typeOfGetting]);
        },

        getClosestDateToDeliver: function () {
            var orderItems = this.findBlockOutside('page').findBlockInside('order').getOrderItems();
            var maxRemainingTimeForItem = 2; // in days
            var closestDate = new Date();

            orderItems.every(checkColorType);

            closestDate.setDate(closestDate.getDate() + maxRemainingTimeForItem);

            return closestDate.toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            function checkColorType(item) {
                if (!item.color.isMainColor) {
                    maxRemainingTimeForItem = 10;

                    return false;
                }

                return true;
            }
        },

        addNumOfDaysToDate: function (num, date) {
            var newDate = parseInt(date.substr(1, 1), 10) + num;

            return date.substr(0, 1) + newDate + date.substr(2, date.length);
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
        }
    }));

});
