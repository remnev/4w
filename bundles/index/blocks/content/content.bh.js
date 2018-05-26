'use strict';

module.exports = function(bh) {
    bh.match('content', function(ctx) {
        ctx.content([
            {
                block: 'products',
                mods: {type: 'prof'},
            },
            {
                block: 'products',
                mods: {type: 'home'},
            },
        ]);
    });
};
