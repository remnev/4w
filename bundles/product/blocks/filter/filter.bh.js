'use strict';

var format = require('util').format;

module.exports = function (bh) {
    bh.match('filter', function (ctx) {
        var data = ctx.tParam('data').productData;
        var contentBemjson = [
            {
                elem: 'title',
                tag: 'h2',
                content: format('Купить %s', data.name.toLowerCase())
            },
            {block: 'color-picker'}
        ];

        if (data.articles.length > 1) {
            contentBemjson.push({block: 'size-picker'});
        }

        contentBemjson.push({block: 'number-picker'});

        ctx
            .js({
                singleArticle: data.articles.length > 1 ? null : data.articles[0]
            })
            .content(contentBemjson);
    });
};
