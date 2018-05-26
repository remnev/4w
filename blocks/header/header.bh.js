'use strict';

module.exports = function(bh) {
    bh.match('header', function(ctx) {
        ctx.content([
            {elem: 'top-links'},
            {elem: 'main'},
            {block: 'breadcrumbs'},
        ]);
    });
};
