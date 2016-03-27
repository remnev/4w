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
    locals.breadcrumbs = [
        {
            title: 'Главная',
            url: '/'
        },
        {
            title: 'Гарантия',
            url: '/warranty/'
        }
    ];

    Promise.props({
        baseInfo: keystone.list('BaseInfo').model
            .findOne()
            .select('company logo mainMenu')
            .populate('mainMenu')
            .exec(),
        page: keystone.list('PageWarranty').model
            .findOne()
            .select('title seo text')
            .exec()
    })
        .done(function (data) {
            _.assign(locals, data);

            view.render(bundleName);
        });

};
