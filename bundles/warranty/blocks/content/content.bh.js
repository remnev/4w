'use strict';

module.exports = function(bh) {
    bh.match('content', function(ctx) {
        var data = ctx.tParam('data').page;

        ctx.content([
            {
                elem: 'header',
                tag: 'h1',
                content: data.title,
            },
            {
                elem: 'text',
                content: data.text,
            },
        ]);
    });
};
