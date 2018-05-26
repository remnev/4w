'use strict';

module.exports = function(bh) {
    bh.match('size-picker', function(ctx) {
        var data = ctx.tParam('data');
        var productData = data.productData;
        var queriedArticle = productData.articles.filter(function(article) {
            return article.size.value === data.query.size;
        })[0];
        var val = JSON.stringify(queriedArticle);

        ctx
            .js(true)
            .content([
                {
                    elem: 'header',
                    content: [
                        'Выберите размер ',
                        {elem: 'pickedSize'},
                    ],
                },
                {
                    block: 'radio-group',
                    mods: {
                        type: 'button',
                        theme: 'islands',
                        size: 'm',
                    },
                    val: val,
                    options: productData.articles.map(generateOptionBemjson),
                },
            ]);
    });

    /**
     * Takes an option bemjson
     *
     * @param  {Object} data
     * @return {Object}
     */
    function generateOptionBemjson(data) {
        return {
            val: JSON.stringify(data),
            text: data.size.value + data.size.units,
        };
    }
};
