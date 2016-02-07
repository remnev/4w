'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('products-menu', function (ctx) {
        var data = ctx.tParam('data');
        var urlPath = data.urlPath;
        var categoriesBemjson = data.productsMenu.map(generateCategoryBemjson);

        ctx.content(categoriesBemjson);

        function generateCategoryBemjson(categoryData) {
            return {
                elem: 'category',
                content: [
                    {
                        block: 'link',
                        url: f('/products/#%s', categoryData.slug),
                        content: categoryData.name,
                        mix: {
                            block: 'products-menu',
                            elem: 'categoryName'
                        }
                    },
                    {
                        elem: 'links',
                        content: categoryData.links.map(generateLinkBemjson)
                    }
                ]
            };
        }

        function generateLinkBemjson(linkData) {
            return {
                elem: 'link',
                mods: {
                    active: urlPath.indexOf(linkData.slug + '/') !== -1
                },
                content: {
                    block: 'link',
                    url: f('/products/%s/', linkData.slug),
                    content: linkData.name
                }
            };
        }
    });
};
