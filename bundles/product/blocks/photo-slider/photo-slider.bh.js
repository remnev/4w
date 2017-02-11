'use strict';

var url = require('url');

module.exports = function (bh) {
    bh.match('photo-slider', function (ctx) {
        var photos = ctx.tParam('data').productData.photos;

        if (photos.length < 1) {
            return;
        }

        ctx
            .js(true)
            .content([
                {
                    elem: 'current',
                    content: {
                        block: 'image',
                        url: buildImgUrl(photos[0], 720)
                    }
                },
                {
                    elem: 'thumbnails',
                    content: {
                        elem: 'thumbnails-inner',
                        content: photos.map(generateThumbnail)
                    }
                }
            ]);
    });

    function generateThumbnail(data) {
        return {
            block: 'image',
            url: buildImgUrl(data, 120),
            mix: {
                block: 'photo-slider',
                elem: 'thumbnail'
            },
            attrs: {
                'data-original-url': buildImgUrl(data, 720)
            }
        };
    }
};

function buildImgUrl (imageData, width) {
    return url.format({
        pathname: '/c-image/' + imageData.public_id + '.' + imageData.format,
        query: {width: width}
    });
}
