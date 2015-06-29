'use strict';

module.exports = function (bh) {
    bh.match('main-menu', function (ctx) {
        var data = ctx.tParam('data');
        var urlPath = data.urlPath;

        ctx.content(data.mainMenu.map(generateItemBemjson));

        function generateItemBemjson(itemData) {
            return {
                block: 'link',
                url: itemData.url,
                mods: {
                    active: urlPath.indexOf(itemData.url) !== -1 ? true : false
                },
                content: itemData.title
            };
        }
    });
};
