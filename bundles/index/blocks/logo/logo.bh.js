'use strict';

module.exports = function (bh) {

    bh.match('logo', function () {
        return {
            tag: 'div',
            mix: {block: 'logo'}
        };
    });

};
