'use strict';

module.exports = function (bh) {

    bh.match('title', function (ctx) {
        var data = ctx.tParam('data').baseInfo.logo;

        ctx
            .js(true)
            .content([
                {block: 'logo'},
                {
                    elem: 'name',
                    content: data.name
                },
                {
                    elem: 'description',
                    content: data.title,
                    tag: 'h1'
                }
            ]);
    });

};
