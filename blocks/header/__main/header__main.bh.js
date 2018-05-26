'use strict';

module.exports = function(bh) {
    bh.match('header__main', function(ctx) {
        var data = ctx.tParam('data');

        ctx.content({
            elem: 'main-wrapper',
            content: [
                {block: 'logo'},
                {block: 'main-menu'},
                {
                    elem: 'right-wrapper',
                    content: [
                        {
                            elem: 'phone-number',
                            content: data.baseInfo ? data.baseInfo.company.phone : data.company.phone,
                        },
                        {
                            elem: 'operation-time',
                            content: data.baseInfo ? data.baseInfo.company.operationTime : data.company.operationTime,
                        },
                    ],
                },
            ],
        });
    });
};
