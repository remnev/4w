'use strict';

module.exports = function(bh) {
    bh.match('content', function(ctx) {
        var data = ctx.tParam('data').page;

        ctx.content([
            {
                elem: 'header',
                tag: 'h1',
                content: data.title,
            },
            {
                elem: 'description',
                content: data.text,
            },
            {
                elem: 'map',
                content: data.map,
            },
            {
                elem: 'panorama',
                content: data.panorama,
            },
            {
                block: 'link',
                mods: {
                    theme: 'islands',
                    size: 'm',
                    pseudo: true,
                },
                mix: {
                    block: 'content',
                    elem: 'print-map',
                },
                attrs: {
                    onclick: 'print()',
                },
                content: 'Распечатать схему проезда',
            },
        ]);
    });
};
