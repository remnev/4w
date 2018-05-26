'use strict';

module.exports = function(bh) {
    bh.match('header', function(ctx) {
        ctx
            .js(true)
            .content([
                {
                    elem: 'top-line',
                    content: {
                        elem: 'wrapper',
                        content: [
                            {block: 'main-menu'},
                            {block: 'contacts'},
                        ],
                    },
                },
                {block: 'title'},
            ]);
    });
};
