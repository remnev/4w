'use strict';

module.exports = function (bh) {

    bh.match('logo', function (ctx) {
        var data = ctx.tParam('data').logo;

        ctx
            .js(true)
            .content([
                {
                    block: 'image',
                    url: '/public/images/logo.svg',
                    alt: '4window logo'
                },
                {
                    elem: 'name',
                    content: data.name
                },
                {
                    elem: 'title',
                    content: data.title,
                    tag: 'h1'
                }
            ]);
    });

};
