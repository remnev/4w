'use strict';

module.exports = function(bh) {
    bh.match('main-menu', function(ctx) {
        var menuBemjson = ctx.tParam('data').baseInfo.mainMenu.map(generateItemBemjson);

        ctx.content(menuBemjson);
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
            url: data.url,
            content: data.title,
        };
    }
};
