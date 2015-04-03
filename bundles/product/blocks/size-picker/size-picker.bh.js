'use strict';

module.exports = function (bh) {
    bh.match('size-picker', function (ctx) {
        var data = ctx.tParam('data').currentProduct;

        ctx
            .js(true)
            .content([
                {
                    elem: 'header',
                    content: [
                        'Выберите размер ',
                        {elem: 'pickedSize'}
                    ]
                },
                {
                    block: 'radio-group',
                    mods: {type: 'button'},
                    options: data.articles.map(generateOptionBemjson)
                }
            ]);
    });

    function generateOptionBemjson(data) {
        return {
            val: JSON.stringify(data),
            text: data.size.value + data.size.units
        };
    }
};
