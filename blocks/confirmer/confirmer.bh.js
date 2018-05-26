'use strict';

module.exports = function(bh) {
    bh.match('confirmer', function(ctx) {
        ctx.js(true);
    });
};
