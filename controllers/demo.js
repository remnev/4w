'use strict';
// TODO: test
const keystone = require('keystone');
const bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function(req, res) {
    const view = new keystone.View(req, res);
    const locals = res.locals;

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};
    locals.title = 'Страница для демонстрации того, как все работает.';
    locals.tasks = ['Заварить чай', 'Почистить зубы', 'Лечь спать'];

    view.render(bundleName);
};
