'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('root', function (ctx) {
        var data = ctx.json().data;

        ctx.tParam('data', data);

        return {
            block: 'page',
            title: data.seo.title,
            favicon: '/public/favicon.ico',
            head: [
                {
                    elem: 'css',
                    url: f('/bundles/%s/_%s.css', data.bundleName, data.bundleName)
                },
                {
                    elem: 'js',
                    url: f('/bundles/%s/_%s.browser.js', data.bundleName, data.bundleName)
                },
                {
                    elem: 'meta',
                    attrs: {
                        name: 'description',
                        content: data.seo.description
                    }
                }
            ],
            content: [
                {block: 'header'},
                {block: 'content'},
                {block: 'footer'},
                {block: 'checkouter'},
                {block: 'confirmer'},
                {
                    block: 'yandex-metrica',
                    params: {
                        id: 29668245,
                        webvisor: true,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true
                    }
                }
            ]
        };
    });
};
