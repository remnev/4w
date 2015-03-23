'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('products-menu', function (ctx) {
        var data = ctx.tParam('data');
        var urlPath = data.urlPath;
        var categoriesBemjson = data.productsMenu.map(generateCategoryBemjson);

        ctx.content(categoriesBemjson);

        function generateCategoryBemjson(data) {
            return {
                elem: 'category',
                content: [
                    {
                        block: 'link',
                        url: f('/products/#%s', data.slug),
                        content: data.name,
                        mix: {
                            block: 'products-menu',
                            elem: 'categoryName'
                        }
                    },
                    {
                        elem: 'links',
                        content: data.links.map(generateLinkBemjson)
                    }
                ]
            };
        }

        function generateLinkBemjson(data) {
            return {
                elem: 'link',
                mods: {
                    active: urlPath.indexOf(data.slug) !== -1 ? true : false
                },
                content: {
                    block: 'link',
                    url: f('/products/%s/', data.slug),
                    content: data.name
                }
            };
        }
    });
};
