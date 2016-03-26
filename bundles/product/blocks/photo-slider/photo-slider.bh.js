'use strict';

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
                        url: photos[0].url
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
            url: data.url,
            mix: {
                block: 'photo-slider',
                elem: 'thumbnail'
            }
        };
    }
};
