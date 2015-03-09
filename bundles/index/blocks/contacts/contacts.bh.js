'use strict';

module.exports = function (bh) {

    bh.match('contacts', function (ctx) {
        var data = ctx.tParam('data').contacts;

        ctx.content([
            {
                elem: 'operation-time',
                content: data.operationTime
            },
            {
                elem: 'phone',
                content: data.phone
            }
        ]);
    });

};
