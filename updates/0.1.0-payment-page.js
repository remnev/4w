/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
    BaseInfo: [
        {
            'company.phone': ' 8 (495) 134-47-74',
            'company.operationTime': 'пн — пт с 9:00 до 20:00',
            'logo.name': '4window',
            'logo.title': 'магазин оконных принадлежностей'
        }
    ],
    PagePayment: [
        {
            'seo.title': 'Как платить — магазин 4window',
            'seo.description': 'Магазин оконных принадлежностей 4window предлагает любые виды оплаты как для физических, так и для юридических лиц.',
            title: 'Оплата',
            text: '<h3>Наличный расчет</h3>\r\n<p>Заказ оплачивается наличными деньгами при получении товара от курьера или на складе магазина.</p>\r\n<h3>Банковская карта на сайте</h3>\r\n<p>Заказ оплачивается банковской картой непосредственно на сайте магазина. Принимаем к оплате следующие карты: Visa, MasterCard.</p>\r\n<h3>Банковский перевод (для физических лиц)</h3>\r\n<p>Заказ оплачивается через любой банк по банковскому переводу на расчетный счет магазина. Комиссия за перевод составляет около 3%. Товар выдается после поступления денежных средств на расчетный счет магазина.</p>\r\n<p><strong>Реквизиты магазина:</strong><br /><br /><cite>ООО &laquo;ПРОФОРМ&raquo;<br /> 107497, г. Москва, ул. Монтажная, д. 7, стр. 1<br /> ИНН/КПП 7718301776/771801001<br /> р/с 40702810338000013025 ПАО &laquo;Сбербанк России&raquo; г. Москва<br /> к/с 30101810400000000225<br /> БИК 044525225<br /> ОГРН 5147746199321<br /> ОКТМО 45305000<br /> ОКВЭД 51.53.24</cite></p>\r\n<h3>Безналичный расчет (для юридических лиц)</h3>\r\n<p>Заказ оплачивается по безналичному расчету по выставленному счету. Товар выдается после поступления денежных средств на расчетный счет магазина.</p>'
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
