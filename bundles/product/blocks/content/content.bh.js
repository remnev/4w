'use strict';

module.exports = function (bh) {
    bh.match('content', function (ctx) {
        ctx.content([
            {
                elem: 'left-column',
                content: {block: 'products-menu'}
            },
            {elem: 'right-column'}
        ]);
    });
};
