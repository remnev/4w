'use strict';

module.exports = function(bh) {
    bh.match('main-menu', function(ctx) {
        var data = ctx.tParam('data');
        var urlPath = data.urlPath;

        ctx.content(data.baseInfo.mainMenu.map(generateItemBemjson));

        /**
         * Takes an item bemjson
         *
         * @param  {Object} itemData
         * @return {Object}
         */
        function generateItemBemjson(itemData) {
            return {
                block: 'link',
                url: itemData.url,
                mods: {
                    active: urlPath.indexOf(itemData.url) !== -1 ? true : false,
                },
                content: itemData.title,
            };
        }
    });
};
