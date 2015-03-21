'use strict';

module.exports = function (bh) {
    bh.match('main-menu', function (ctx) {
        var data = ctx.tParam('data');
        var urlPath = data.urlPath;

        ctx.content(data.mainMenu.map(generateItemBemjson));

        function generateItemBemjson(data) {
            return {
                block: 'link',
                url: data.url,
                mods: {
                    active: urlPath.indexOf(data.url) !== -1 ? true : false
                },
                content: data.title
            };
        }
    });
};
