'use strict';

module.exports = function (bh) {
    bh.match('content', function (ctx) {
        var data = ctx.tParam('data').currentProduct;

        ctx.content([
            {
                elem: 'left-column',
                content: {block: 'products-menu'}
            },
            {
                elem: 'right-column',
                content: [
                    {
                        elem: 'header',
                        tag: 'h1',
                        content: data.name + ' ' + data.article
                    },
                    {
                        elem: 'description',
                        content: data.description
                    },
                    {block: 'filter'}
                ]
            }
        ]);
    });
};
