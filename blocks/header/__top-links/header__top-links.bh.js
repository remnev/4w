'use strict';

module.exports = function(bh) {
    bh.match('header__top-links', function(ctx) {
        ctx.content([
            {block: 'order'},
        ]);
    });
};
