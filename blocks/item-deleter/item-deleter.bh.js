'use strict';

module.exports = function(bh) {
    bh.match('item-deleter', function(ctx) {
        ctx
            .js(true)
            .content('×');
    });
};
