'use strict';

module.exports = function (bh) {

    bh.match('main-menu', function (ctx) {
        var menuBemjson = ctx.tParam('data').mainMenu.map(generateItemBemjson);

        ctx.content(menuBemjson);
    });

    function generateItemBemjson(data) {
        return {
            block: 'link',
            url: data.url,
            content: data.title
        };
    }

};
