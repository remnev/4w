'use strict';

module.exports = function(bh) {
    bh.match('order', function(ctx) {
        ctx.js(true);
    });
};
