'use strict';

var keystone = require('keystone');
var app = keystone.express();
var expressBem = require('express-bem')({path: './bundles'});
var controllers = require('./controllers');

require('dotenv').load();
require('keystone-nodemailer')(keystone);

expressBem.bindTo(app);
expressBem.engine('.server.bh.js', require('express-bem-bh/lib/engines/bh')({
    force: false,
    source: '?.server.bh.js',
    dataKey: 'data'
}));

keystone.init({
    name: '4window.ru',
    brand: '4window.ru',
    favicon: 'public/favicon.ico',
    'view engine': '.server.bh.js',
    'auto update': true,
    session: true,
    auth: true,
    mongo: process.env.MONGO_URI,
    'user model': 'User',
    'cookie secret': process.env.COOKIE_SECRET,
    port: process.env.PORT,
    emails: 'jade-templates/emails',
    'mandrill api key': 'foo',
    'email nodemailer': {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_AUTH_LOGIN,
            pass: process.env.SMTP_AUTH_PASS
        }
    },
    'cloudinary config': process.env.CLOUDINARY_URL,
    'cloudinary prefix': '4window',
    'wysiwyg menubar': true,
    app: app
});

keystone.import('models');

// TODO: move it to module
keystone.pre('routes', function (req, res, next) {
    res.locals.urlPath = req.path;

    next();
});

keystone.pre('routes', require('body-parser').json());

keystone.set('routes', function (app) { // eslint-disable-line no-shadow
    app.get('/demo', controllers.demo);
    app.get('/', controllers.index);
    app.get('/products', function (req, res) {
        res.redirect('/products/flat-strips-on-roll/');
    });
    app.get('/products/:productSlug', controllers.product);
    app.get('/contacts', controllers.contacts);
    app.get('/delivery', controllers.delivery);
    app.get('/payment', controllers.payment);
    app.get('/warranty', controllers.warranty);
    app.get('/yandex-market-price', controllers['yandex-market-price']);
    app.get('/sitemap.xml', controllers.sitemap);
    app.post('/api/send-order', controllers['api-send-order']);
});

keystone.set('nav', {
    users: 'users'
});

keystone.start();

process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
})
