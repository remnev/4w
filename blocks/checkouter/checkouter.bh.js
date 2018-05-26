'use strict';

module.exports = function(bh) {
    bh.match('checkouter', function(ctx) {
        ctx.js(true);
    });
};
