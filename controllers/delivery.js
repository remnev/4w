'use strict';
// TODO: test
const keystone = require('keystone');
const Promise = require('bluebird');
const _ = require('lodash');
const bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function(req, res) {
    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};
    locals.breadcrumbs = [
        {
            title: 'Главная',
            url: '/',
        },
        {
            title: 'Доставка',
            url: '/delivery/',
        },
    ];

    Promise.props({
        baseInfo: keystone.list('BaseInfo').model
            .findOne()
            .select('company logo mainMenu')
            .populate('mainMenu')
            .exec(),
        page: keystone.list('PageDelivery').model
            .findOne()
            .select('title seo text')
            .exec(),
        products: keystone.list('Product').model
            .find({state: 'published'})
            .select('slug name type')
            .sort('sortWeight')
            .exec(),
    })
        .done(function(data) {
            _.assign(locals, data);

            view.render(bundleName);
        });
};
