'use strict';
// TODO: jsdoc
// TODO: test
// TODO: csrf check
var keystone = require('keystone');

module.exports = function (req, res) {
    var Order = keystone.list('Order');
    var order = new Order.model({ // eslint-disable-line new-cap
        items: JSON.stringify(req.body.orderItems),
        params: JSON.stringify(req.body.orderParams),
        typeOfGetting: req.body.typeOfGetting,
        buyerEmail: req.body.email,
        buyerName: req.body.buyerName,
        typeOfPayment: req.body.typeOfPayment
    });

    order.save(function (err, data) {
        if (err) {
            console.log(err); // eslint-disable-line no-console
            res.send(500);

            return;
        }

        res.json({
            orderId: data.orderId,
            buyerEmail: data.buyerEmail,
            buyerName: data.buyerName,
            isPaymentRequired: data.typeOfPayment === 'cc',
            orderCoast: data.coast
        });
    });

};
