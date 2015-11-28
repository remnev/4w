/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
    PageWarranty: [
        {
            'seo.title': 'Гарантия и возврат товара — магазин 4window',
            'seo.description': 'Гарантия на продукцию магазина оконных принадлежностей 4window. Условия возврата товара.',
            title: 'Гарантия и возврат товара',
            text: '<h3>Гарантия</h3>\r\n<p>Мы работаем только с проверенными производителями и поставщиками. На все товары из нашего магазина устанавливается гарантийный срок 1 год со дня покупки.</p>\r\n<h3>Возврат товара</h3>\r\n<p>Если вы получили товар ненадлежащего качества, вы можете вернуть или заменить товар. Если же вы решили вернуть деньги за некачественный товар, то мы сделаем это. На основании утверждённой рекламации и письма с просьбой о возврате денежных средств, мы вернем вам деньги в течение 5 рабочих дней.</p><p>Для обратной связи вам следует позвонить по телефону магазина, и наш менеджер расскажет вам, как и куда вернуть товар.</p>'
        }
    ]
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone'),
    async = require('async'),
    User = keystone.list('User');

var admins = [
    { email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin(admin, done) {

    var newAdmin = new User.model(admin);

    newAdmin.isAdmin = true;
    newAdmin.save(function(err) {
        if (err) {
            console.error("Error adding admin " + admin.email + " to the database:");
            console.error(err);
        } else {
            console.log("Added admin " + admin.email + " to the database.");
        }
        done(err);
    });

}

exports = module.exports = function(done) {
    async.forEach(admins, createAdmin, done);
};

*/
