'use strict';

module.exports = function (bh) {
    bh.match('counter', function (ctx) {
        ctx
            .js(true)
            .content([
                {elem: 'decrease'},
                {
                    block: 'input',
                    val: ctx.json().val || 1
                },
                {elem: 'increase'}
            ]);
    });

};
