'use strict';

module.exports = function(bh) {
    bh.match('content', function(ctx) {
        var data = ctx.tParam('data');
        var productData = data.productData;
        var coatingType = data.pathParams.coatingType;

        ctx.content([
            {
                elem: 'left-column',
                content: {block: 'products-menu'},
            },
            {
                elem: 'right-column',
                content: [
                    {
                        elem: 'header',
                        tag: 'h1',
                        content: getHeaderText(productData, coatingType),
                    },
                    {
                        elem: 'description',
                        content: productData.description,
                    },
                    {block: 'photo-slider'},
                    productData.showPriceTable && {block: 'pricer'},
                    {block: 'filter'},
                    {
                        elem: 'about-product',
                        content: productData.aboutProduct,
                    },
                ],
            },
        ]);
    });

    /**
     * @param  {Object} productData
     * @param  {String} productData.name
     * @param  {String} coatingType
     * @return {String} Header text
     */
    function getHeaderText(productData, coatingType) {
        var text = productData.name;
        var typeToText = {
            renolit: ' (ламинация, палитра RENOLIT)',
            ral: ' (покраска, палитра RAL)',
        };

        if (typeToText[coatingType]) {
            text += typeToText[coatingType];
        }

        return bh.xmlEscape(text);
    }
};
