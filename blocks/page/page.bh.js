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
                // todo: move the moment to a bundle
                {
                    elem: 'js',
                    url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min.js'
                },
                {
                    elem: 'js',
                    url: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/ru.js'
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
                {block: 'statuser'},
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
