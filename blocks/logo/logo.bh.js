'use strict';

module.exports = function (bh) {
    var text = ['магазин', 'оконных принадлежностей'].join('<br/>');

    bh.match('logo', function () {
        return {
            block: 'link',
            url: '/',
            mix: {block: 'logo'},
            content: text
        };
    });
};
