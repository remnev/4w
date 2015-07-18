'use strict';

var keystone = require('keystone');
var format = require('util').format;
var moment = require('moment');
var Types = keystone.Field.Types;

var Order = new keystone.List('Order', {
    hidden: true,
    autokey: {
        path: 'orderId',
        from: 'year-month',
        unique: true
    }
});

Order.add({
    items: {
        type: String,
        required: true,
        initial: false
    },
    params: {
        type: String,
        required: true,
        initial: false
    },
    typeOfGetting: {
        type: String
    },
    buyerEmail: {
        type: Types.Email,
        required: true,
        initial: false
    },
    typeOfPayment: {
        type: String,
        required: true,
        initial: false
    },
    createdAt: {
        type: Date
    }
    // year-month: virtual
    // coast: virtual
});

Order.schema.virtual('coast').get(function () {
    return this.calculateOrderCoast();
});

Order.schema.virtual('year-month').get(function () {
    return moment(this.createdAt).format('YYww');
});

Order.schema.methods.sendOrderEmailToOffice = function (cb) {
    new keystone.Email('order-email-to-office').send({
        to: 'orders@4window.ru',
        from: {
            name: '4window — магазин оконных принадлежностей',
            email: 'no-reply@4window.ru'
        },
        subject: format('Заказ №%s — 4window.ru', this.orderId),
        data: {
            orderId: this.orderId,
            createdAt: moment(this.createdAt).format('DD.MM.YYYY'),
            items: JSON.parse(this.items),
            params: JSON.parse(this.params),
            coast: this.coast,
            typeOfGetting: this.typeOfGetting
        }
    }, cb);
};

Order.schema.methods.sendOrderEmailToBuyer = function (cb) {
    new keystone.Email('order-email-to-buyer').send({
        to: this.buyerEmail,
        from: {
            name: '4window — магазин оконных принадлежностей',
            email: 'no-reply@4window.ru'
        },
        subject: format('Заказ №%s — 4window.ru', this.orderId),
        data: {
            orderId: this.orderId,
            createdAt: moment(this.createdAt).format('DD.MM.YYYY'),
            items: JSON.parse(this.items),
            params: JSON.parse(this.params),
            coast: this.coast,
            typeOfGetting: this.typeOfGetting
        }
    }, cb);
};

Order.schema.methods.calculateOrderCoast = function () {
    var orderItems = JSON.parse(this.items);
    var coast = this.typeOfGetting === 'dim' ? 500 : 0;

    orderItems.forEach(function (item) {
        coast += this.getPriceForItem(item) * item.number;
    }, this);

    return coast;
};

Order.schema.methods.getPriceForItem = function (item) {
    var price;
    var itemArticle = item.articleName;
    var productSlug = item.productSlug;
    var priceType = item.isLaminate === 'true' ? 'laminate' : 'pure';
    var productData = require(format('../controllers/mock-data/%s', productSlug));

    productData.articles.forEach(function (article) {
        if (article.name === itemArticle) {
            price = article.price[priceType];

            return;
        }
    });

    return price;
};

Order.schema.pre('save', function (next) {
    this.createdAt = new Date();

    next();
});

Order.schema.post('save', function () {
    this.sendOrderEmailToOffice(function (sendToOfficeError) {
        if (sendToOfficeError) {
            throw sendToOfficeError;
        }

        this.sendOrderEmailToBuyer(function (sendToBuyerError) {
            if (sendToBuyerError) {
                throw sendToBuyerError;
            }
        });
    }.bind(this));
});

Order.register();
