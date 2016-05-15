'use strict';

var _ = require('lodash');

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

        _.remove(ctx.json().content, function (item) {
            return item.block === 'footer';
        });
    });

};
