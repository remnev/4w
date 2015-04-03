'use strict';

module.exports = function (bh) {
    bh.match('counter', function (ctx) {
        ctx
            .js(true)
            .content([
                {elem: 'decrease'},
                {
                    block: 'input',
                    mods: {disabled: true},
                    val: 1
                },
                {elem: 'increase'}
            ]);
    });

};
