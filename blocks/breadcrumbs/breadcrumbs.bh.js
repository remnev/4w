'use strict';

module.exports = function (bh) {
    bh.match('breadcrumbs', function (ctx) {
        var data = ctx.tParam('data');
        var currentProduct = data.currentProduct;

        ctx.content(data.breadcrumbs.map(generateItemBemjson));

        function generateItemBemjson(data) {
            return {
                block: 'link',
                url: data.url,
                mods: {
                    active: data.url.indexOf(currentProduct.slug) !== -1 ? true : false
                },
                content: data.title
            };
        }
    });
};
