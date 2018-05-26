'use strict';

var url = require('url');
var moment = require('moment');
var format = require('util').format;

module.exports = function(bh) {
    bh.match('footer', function(ctx) {
        var data = ctx.tParam('data');
        var profProducts = data.products.filter(function(item) {
            return item.type === 'prof';
        });
        var homeProducts = data.products.filter(function(item) {
            return item.type === 'home';
        });

        ctx.content({
            elem: 'wrapper',
            content: [
                {
                    elem: 'section',
                    content: [
                        {
                            elem: 'title',
                            content: 'Для профессионалов:',
                        },
                    ].concat(profProducts.map(generateLink)),
                },
                {
                    elem: 'section',
                    content: [
                        {
                            elem: 'title',
                            content: 'Для дома:',
                        },
                    ].concat(homeProducts.map(generateLink)),
                },
                {
                    elem: 'section',
                    content: [
                        {
                            block: 'link',
                            url: '/delivery/',
                            content: 'Доставка во все регионы',
                        },
                        {
                            block: 'link',
                            url: '/payment/',
                            content: 'Любые виды оплаты',
                        },
                        {
                            block: 'link',
                            url: '/warranty/',
                            content: 'Гарантия и возврат',
                        },
                        {
                            block: 'link',
                            url: '/contacts/',
                            content: 'Адреса офиса и склада',
                        },
                    ],
                },
                {
                    elem: 'section',
                    content: [
                        {
                            block: 'link',
                            url: url.format({
                                protocol: 'http',
                                hostname: 'market.yandex.ru',
                                pathname: '/shop/346454/reviews',
                            }),
                            content: {
                                block: 'image',
                                url: url.format({
                                    protocol: 'http',
                                    hostname: 'clck.yandex.ru',
                                    pathname: '/redir/dtype=stred/pid=47/cid=2505/*http://grade.market.yandex.ru/',
                                    query: {
                                        id: 346454,
                                        action: 'image',
                                        size: 0,
                                    },
                                }),
                                attrs: {
                                    border: 0,
                                    width: 88,
                                    height: 31,
                                },
                            },
                        },
                        '4window – магазин оконных принадлежностей ООО "Проформ" © ' + moment().year(),
                    ],
                },
            ],
        });
    });
};

/**
 * Takes a link bemjson
 *
 * @param  {Object} data
 * @return {Object}
 */
function generateLink(data) {
    return {
        block: 'link',
        url: format('/products/%s/', data.slug),
        content: data.name,
    };
}
