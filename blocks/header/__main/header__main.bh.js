'use strict';

module.exports = function (bh) {
    bh.match('header__main', function (ctx) {
        var data = ctx.tParam('data');

        ctx.content({
            elem: 'main-wrapper',
            content: [
                {block: 'logo'},
                {block: 'main-menu'},
                {
                    elem: 'phone-number',
                    content: data.company.phone
                }
            ]
        });
    });
};
