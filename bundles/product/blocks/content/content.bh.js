'use strict';

module.exports = function(bh) {
    bh.match('content', function(ctx) {
        var data = ctx.tParam('data').productData;

        ctx.content([
            {
                elem: 'left-column',
                content: {block: 'products-menu'},
            },
            {
                elem: 'right-column',
                content: [
                    {
                        elem: 'header',
                        tag: 'h1',
                        content: data.name,
                    },
                    {
                        elem: 'description',
                        content: data.description,
                    },
                    {block: 'photo-slider'},
                    data.showPriceTable && {block: 'pricer'},
                    {block: 'filter'},
                    {
                        elem: 'about-product',
                        content: data.aboutProduct,
                    },
                ],
            },
        ]);
    });
};
