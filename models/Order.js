'use strict';

const keystone = require('keystone');
const format = require('util').format;
const moment = require('moment');
const uniqId = require('unique-id');
const Promise = require('bluebird');
const Email = require('keystone-email');
const Types = keystone.Field.Types;

const from = {
    name: '4window — магазин оконных принадлежностей',
    email: 'no-reply@4window.ru',
};
const nodemailerConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_AUTH_LOGIN,
        pass: process.env.SMTP_AUTH_PASS,
    },
};
const Order = new keystone.List('Order', {
    hidden: true,
    autokey: {
        path: 'orderId',
        from: 'year-month',
        unique: true,
    },
});

Order.add({
    items: {
        type: String,
        required: true,
        initial: false,
    },
    params: {
        type: String,
        required: true,
        initial: false,
    },
    typeOfGetting: {
        type: String,
    },
    buyerEmail: {
        type: Types.Email,
        required: true,
        initial: false,
    },
    typeOfPayment: {
        type: String,
        required: true,
        initial: false,
    },
    coast: {
        type: Number,
    },
    createdAt: {
        type: Date,
    },
    // year-month: virtual
});

Order.schema.virtual('year-month').get(function() {
    return format('%s%s', moment(this.createdAt).format('YYww'), uniqId(2, '0123456789'));
});

Order.schema.methods.sendOrderEmailToOffice = function() {
    const items = JSON.parse(this.items).map(getItem);
    const email = new Email('pug-templates/emails/order-email-to-office.pug', {transport: 'nodemailer'});
    const locals = {
        data: {
            orderId: this.orderId,
            createdAt: moment(this.createdAt).format('DD.MM.YYYY'),
            items: items,
            params: JSON.parse(this.params),
            coast: this.coast,
            typeOfGetting: this.typeOfGetting,
            typeOfPayment: this.typeOfPayment,
        },
    };
    const options = {
        subject: `Заказ №${this.orderId} — 4window.ru`,
        to: {
            name: '4window — магазин оконных принадлежностей',
            email: 'orders@4window.ru',
        },
        from,
        nodemailerConfig,
    };

    return new Promise((res, rej) => {
        email.send(locals, options, (error) => {
            if (error) {
                throw error;
            }

            res();
        });
    });
};

Order.schema.methods.sendOrderEmailToBuyer = function() {
    const items = JSON.parse(this.items).map(getItem);
    const email = new Email('pug-templates/emails/order-email-to-buyer.pug', {transport: 'nodemailer'});
    const locals = {
        data: {
            orderId: this.orderId,
            createdAt: moment(this.createdAt).format('DD.MM.YYYY'),
            items: items,
            params: JSON.parse(this.params),
            coast: this.coast,
            typeOfGetting: this.typeOfGetting,
            typeOfPayment: this.typeOfPayment,
        },
    };
    const options = {
        subject: `Заказ №${this.orderId} — 4window.ru`,
        to: {
            name: this.buyerEmail,
            email: this.buyerEmail,
        },
        from,
        nodemailerConfig,
    };

    return new Promise((res, rej) => {
        email.send(locals, options, (error) => {
            if (error) {
                throw error;
            }

            res();
        });
    });
};

Order.schema.methods.calculateOrderCoast = function() {
    const self = this;
    const orderItems = JSON.parse(this.items);
    const coast = this.typeOfGetting === 'dim' ? 500 : 0;

    return Promise
        .reduce(orderItems, function(total, item) {
            return self.getPriceForItem(item)
                .then(function(itemPrice) {
                    return total + itemPrice;
                });
        }, coast);
};

Order.schema.methods.getPriceForItem = function(item) {
    const priceType = item.isLaminate === 'true' ? 'laminate' : 'pure';

    return Promise
        .props({
            article: keystone.list('Article').model
                .findOne({name: item.articleName})
                .select('price.pure price.laminate')
                .exec(),
            product: keystone.list('Product').model
                .findOne({slug: item.productSlug})
                .select('baseDiscount numberDiscount')
                .exec(),
        })
        .then(function(data) {
            const price = data.article.price[priceType];

            return item.number * Math.floor(price - calculateDiscount(price, priceType, item.number, data.product));
        });
};

Order.schema.pre('save', function(next) {
    this.createdAt = new Date();

    this.calculateOrderCoast()
        .bind(this)
        .then(function(coast) {
            this.coast = coast;
        })
        .done(next);
});

Order.schema.post('save', function() {
    this.sendOrderEmailToOffice()
        .bind(this)
        .then(this.sendOrderEmailToBuyer);
});

Order.register();

/**
 * Calculates the discount amount
 *
 * @param  {Number} basePrice
 * @param  {String} priceType
 * @param  {Number} number       Number of items
 * @param  {Object} discountData Discount store
 * @return {Number}
 */
function calculateDiscount(basePrice, priceType, number, discountData) {
    const baseDiscount = basePrice * 0.01 * discountData.baseDiscount[priceType];
    let numberDiscount = 0;

    if (parseInt(number, 10) >= discountData.numberDiscount[priceType].number) {
        numberDiscount = basePrice * 0.01 * discountData.numberDiscount[priceType].value;
    }

    return baseDiscount + numberDiscount;
}

/**
 * Patches an item object with a price property
 *
 * @param  {Object} item Raw item
 * @return {Object}      Patched item
 */
function getItem(item) {
    const priceType = item.isLaminate === 'true' ? 'laminate' : 'pure';
    const discountData = {
        baseDiscount: {
            pure: item.discount.base.pure,
            laminate: item.discount.base.laminate,
        },
        numberDiscount: {
            pure: {
                number: item.discount.number.pure.number,
                value: item.discount.number.pure.value,
            },
            laminate: {
                number: item.discount.number.laminate.number,
                value: item.discount.number.laminate.value,
            },
        },
    };

    item.price = Math.floor(item.price - calculateDiscount(item.price, priceType, item.number, discountData));

    return item;
}
