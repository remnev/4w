'use strict';

module.exports = function (bh) {
    bh.match('content', function (ctx) {
        var data = ctx.tParam('data');

        ctx.content([
            {
                elem: 'header',
                tag: 'h1',
                content: 'Доставка'
            },
            {
                elem: 'description',
                content: data.description
            }
        ]);
    });
};
