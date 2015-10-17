'use strict';

module.exports = function (bh) {
    bh.match('checkouter__modal', function (ctx, json) {
        return {
            // closestDateToDeliver: closestDateToDeliver,
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
                    content: 'Параметры заказа'
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
                                        val: json.typeOfGetting,
                                        options: json.typeOfGettingOptions
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
                                        val: json.typeOfPayment,
                                        options: json.typeOfPaymentOptions
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
                                    content: json.deliveryDateTitles[json.typeOfGetting]
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
                                        val: json.closestDateToDeliver,
                                        options: [
                                            {
                                                val: json.closestDateToDeliver,
                                                text: json.closestDateToDeliver
                                            },
                                            {
                                                val: addNumOfDaysToDate(1, json.closestDateToDeliver),
                                                text: addNumOfDaysToDate(1, json.closestDateToDeliver)
                                            },
                                            {
                                                val: addNumOfDaysToDate(2, json.closestDateToDeliver),
                                                text: addNumOfDaysToDate(2, json.closestDateToDeliver)
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
                                        placeholder: json.addressPlaceholders[json.typeOfGetting]
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
                                        mix: {
                                            block: 'checkouter',
                                            elem: 'commentary-textarea'
                                        },
                                        attrs: {
                                            rows: 5
                                        },
                                        placeholder: 'Например, доп. номер телефона, особенности проезда и т.д.'
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
    });

    function addNumOfDaysToDate (num, date) {
        var format = 'DD MMMM YYYY';
        var resultDate = moment(date, format).add(num, 'd');

        // skip the weekends days
        if (resultDate.day() === 0 || resultDate.day() === 6) {
            return addNumOfDaysToDate(1, resultDate);
        }

        return resultDate.format(format);
    }
};
