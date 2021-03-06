'use strict';

module.exports = function(bh) {
    bh.match('breadcrumbs', function(ctx) {
        var data = ctx.tParam('data');

        ctx.content(data.breadcrumbs.map(generateItemBemjson));
    });
};

/**
 * Takes an item bemjson
 *
 * @param  {Object} data
 * @param  {Number} i
 * @param  {Array} arr
 * @return {Object}
 */
function generateItemBemjson(data, i, arr) {
    return {
        block: 'link',
        url: data.url,
        mods: {
            active: i === arr.length - 1,
        },
        content: data.title,
    };
}
