'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var Promise = require('bluebird');
var _ = require('lodash');
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};
    locals.mainMenu = require('../mock-data/main-menu');
    locals.breadcrumbs = [
        {
            title: 'Главная',
            url: '/'
        },
        {
            title: 'Контакты',
            url: '/contacts/'
        }
    ];

    Promise.props({
        baseInfo: keystone.list('BaseInfo').model
            .findOne()
            .select('company logo')
            .exec(),
        page: keystone.list('PageContacts').model
            .findOne()
            .select('title seo text map panorama')
            .exec()
    })
        .done(function (data) {
            _.assign(locals, data);

            view.render(bundleName);
        });
};
