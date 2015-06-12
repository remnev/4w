'use strict';

var f = require('util').format;

module.exports = function (bh) {

    bh.match('products_type_prof', function (ctx) {
        var data = ctx.tParam('data').products.prof;
        var itemsBemjson = data.items.map(generateItemBemjson);

        ctx.content([
            {
                block: 'link',
                url: '/products/#prof',
                content: {
                    block: 'products',
                    elem: 'title',
                    elemMods: {direction: 'left'},
                    content: data.title,
                    tag: 'h2'
                }
            },
            {
                elem: 'items',
                content: itemsBemjson
            }
        ]);
    });

    bh.match('products_type_home', function (ctx) {
        var data = ctx.tParam('data').products.home;
        var itemsBemjson = data.items.map(generateItemBemjson);

        ctx.content([
            {
                block: 'link',
                url: '/products/#home',
                content: {
                    block: 'products',
                    elem: 'title',
                    elemMods: {direction: 'right'},
                    content: data.title,
                    tag: 'h2'
                }
            },
            {
                elem: 'items',
                content: itemsBemjson
            }
        ]);
    });

    function generateItemBemjson(data) {
        return {
            block: 'link',
            mix: {
                block: 'products',
                elem: 'item'
            },
            url: f('/products/%s/', data.slug),
            content: [
                {
                    block: 'image',
                    url: data.photo,
                    alt: data.title
                },
                {
                    block: 'products',
                    elem: 'product-title',
                    content: data.title
                }
            ]
        };
    }

};
