'use strict';

var f = require('util').format;
var url = require('url');

module.exports = function(bh) {
    bh.match('products_type_prof', function(ctx) {
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
                    tag: 'h2',
                },
            },
            {
                elem: 'items',
                content: itemsBemjson,
            },
        ]);
    });

    bh.match('products_type_home', function(ctx) {
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
                    tag: 'h2',
                },
            },
            {
                elem: 'items',
                content: itemsBemjson,
            },
        ]);
    });

    /**
     * Takes an item bemjson
     *
     * @param  {Object}  data
     * @return {Object}
     */
    function generateItemBemjson(data) {
        return {
            block: 'link',
            mix: {
                block: 'products',
                elem: 'item',
            },
            url: f('/products/%s/', data.slug),
            content: [
                {
                    block: 'image',
                    url: url.format({
                        pathname: '/c-image/' + data.photo.public_id + '.' + data.photo.format,
                        query: {width: 420},
                    }),
                    alt: data.title,
                },
                {
                    block: 'products',
                    elem: 'product-title',
                    content: data.title,
                },
            ],
        };
    }
};
