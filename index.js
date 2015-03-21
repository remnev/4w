'use strict';

var keystone = require('keystone');
var app = keystone.express();
var expressBem = require('express-bem')({path: './bundles'});
var controllers = require('./controllers');

require('dotenv').load();

expressBem.bindTo(app);
expressBem.engine('.server.bh.js', require('express-bem-bh/lib/engines/bh')({
    force: true, // TODO: don't use in production environment
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
    'user model': 'User',
    // TODO: get from .env
    'cookie secret': 'gT+N?^">Pa3hk5i!}B,3>[sRlDFJs7&HKU`?neN4gK,#3PA`c)1c(;7Ri7OP.gt4',
    port: process.env.PORT
});

keystone.import('models');

// TODO: move it to module
keystone.pre('routes', function (req, res, next) {
    res.locals.urlPath = req.path;

    next();
});

keystone.set('routes', function (app) {
    app.get('/demo', controllers.demo);
    app.get('/', controllers.index);
    app.get('/products/:productSlug', controllers.product);
});

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
    users: 'users'
});

keystone.connect(app);

keystone.start();
