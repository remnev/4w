'use strict';

module.exports = function (bh) {
    bh.match('photo-slider', function (ctx) {
        var photos = ctx.tParam('data').currentProduct.photos;

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
                        url: photos[0]
                    }
                },
                {
                    elem: 'thumbnails',
                    content: photos.map(generateThumbnail)
                }
            ]);
    });

    function generateThumbnail(data) {
        return {
            block: 'image',
            url: data,
            mix: {
                block: 'photo-slider',
                elem: 'thumbnail'
            }
        };
    }
};
