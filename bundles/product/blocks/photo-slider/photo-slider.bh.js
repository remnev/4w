'use strict';

var url = require('url');

module.exports = function(bh) {
    bh.match('photo-slider', function(ctx) {
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
                        url: buildImgUrl(photos[0], 720),
                    },
                },
                {
                    elem: 'thumbnails',
                    content: {
                        elem: 'thumbnails-inner',
                        content: photos.map(generateThumbnail),
                    },
                },
            ]);
    });

    /**
     * Takes a thumbnail bemjson
     *
     * @param  {Object} data
     * @return {Object}
     */
    function generateThumbnail(data) {
        return {
            block: 'image',
            url: buildImgUrl(data, 120),
            mix: {
                block: 'photo-slider',
                elem: 'thumbnail',
            },
            attrs: {
                'data-original-url': buildImgUrl(data, 720),
            },
        };
    }
};

/**
 * Takes an img src URL
 *
 * @param  {Object} imageData
 * @param  {Number} width
 * @return {String}
 */
function buildImgUrl(imageData, width) {
    return url.format({
        pathname: '/c-image/' + imageData.public_id + '.' + imageData.format,
        query: {width: width},
    });
}
