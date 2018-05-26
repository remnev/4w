'use strict';

module.exports = function(bh) {
    bh.match('statuser', function(ctx) {
        ctx.js(true);
    });
};
