'use strict';

module.exports = function (bh) {
    bh.match('filter', function (ctx) {
        ctx.content([
            {block: 'color-picker'}/*,
            {block: 'width-picker'},
            {block: 'calculator'},
            {block: 'button'}*/
        ]);
    });
};
