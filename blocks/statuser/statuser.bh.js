'use strict';

module.exports = function(bh) {
    bh.match('statuser', function(ctx) {
        var data = ctx.tParam('data');

        ctx.js({SBER_API_TOKEN: data.env.SBER_API_TOKEN});
    });
};
