'use strict';

const express = require('express');
const app = express();
const keystone = require('keystone');
const expressBem = require('express-bem')({path: './bundles'});
const importer = keystone.importer(__dirname);
const controllers = importer('./controllers');
const middlewares = importer('./middlewares');

require('dotenv').load();

expressBem.bindTo(app);
expressBem.engine('.server.bh.js', require('express-bem-bh/lib/engines/bh')({
    force: false,
    source: '?.server.bh.js',
    dataKey: 'data',
}));

keystone.init({
    'name': '4window.ru',
    'brand': '4window.ru',
    'favicon': 'public/favicon.ico',
    'view engine': '.server.bh.js',
    'auto update': true,
    'session': true,
    'auth': true,
    'mongo': process.env.MONGO_URI,
    'user model': 'User',
    'cookie secret': process.env.COOKIE_SECRET,
    'port': process.env.PORT,
    'cloudinary config': process.env.CLOUDINARY_URL,
    'cloudinary prefix': '4window',
});

keystone.import('models');

app.use(require('body-parser').json());
app.use(middlewares['url-path']());
app.use(middlewares.env);
app.get('/', controllers.index);
app.get('/products', (req, res) => {
    res.redirect('/products/flat-strips-on-roll/');
});
app.get('/products/:productSlug/:coatingType?', controllers.product);
app.get('/contacts', controllers.contacts);
app.get('/delivery', controllers.delivery);
app.get('/payment', controllers.payment);
app.get('/warranty', controllers.warranty);
app.get('/yandex-market-price', controllers['yandex-market-price']);
app.get('/sitemap.xml', controllers.sitemap);
app.post('/api/send-order', controllers['api-send-order']);


keystone.set('nav', {
    users: 'users',
});

keystone.set('routes', app);
keystone.start();
