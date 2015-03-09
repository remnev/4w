'use strict';

module.exports = function (bh) {

    bh.match('page', function (ctx) {
        ctx.json().content.unshift(
            {
                block: 'background',
                mods: {type: 'prof'}
            },
            {
                block: 'background',
                mods: {type: 'home'}
            }
        );
    });

};
