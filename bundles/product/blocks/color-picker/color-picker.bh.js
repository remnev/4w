'use strict';

module.exports = function(bh) {
    bh.match('color-picker', function(ctx, json) {
        var data = ctx.tParam('data');
        var productData = data.productData;
        var coatingType = data.pathParams.coatingType;
        var color = data.query.color;
        var colorsRenolit = data.colorsRenolit;
        var colorsRal = data.colorsRal;

        ctx
            .js({
                productSlug: productData.slug,
                coating: productData.coating,
                colors: {
                    renolit: colorsRenolit,
                    renolitAvailable: productData.colorsRenolit.available,
                    ral: colorsRal,
                },
            })
            .mods({
                'visible-picker': coatingType,
                'picked': getIsPicked(coatingType, color),
            })
            .content([
                {
                    elem: 'header',
                    content: [
                        {
                            tag: 'span',
                            content: 'Выберите внешний вид ',
                        },
                        {
                            elem: 'picked-color-description',
                            mods: {type: coatingType},
                            data: getDescriptionData(productData, color, coatingType, colorsRenolit),
                        },
                    ],
                },
                {
                    block: 'radio-group',
                    mods: {
                        theme: 'islands',
                        size: 'm',
                        type: 'button',
                    },
                    mix: {
                        block: json.block,
                        elem: 'coating-type',
                    },
                    val: coatingType,
                    options: productData.coating.map(generateCoatingTypeBemjson),
                },
                {
                    block: 'select',
                    mods: {
                        mode: 'radio',
                        theme: 'islands',
                        size: 'm',
                    },
                    mix: {
                        block: json.block,
                        elem: 'picker-renolit',
                    },
                    val: coatingType === 'renolit' && parseInt(color, 10),
                    options: getRenolitOptions(productData.colorsRenolit.available, colorsRenolit),
                },
                {
                    block: 'select',
                    mods: {
                        mode: 'radio',
                        theme: 'islands',
                        size: 'm',
                    },
                    mix: {
                        block: json.block,
                        elem: 'picker-ral',
                    },
                    val: coatingType === 'ral' && color,
                    options: getRalOptions(colorsRal),
                },
                {
                    elem: 'color',
                    mods: {type: coatingType},
                    data: getColorElemData(coatingType, color, colorsRenolit, colorsRal),
                },
            ]);
    });

    /**
     * @param  {Object} data
     * @param  {String} data.name
     * @param  {String} data.title
     * @return {Object}
     */
    function generateCoatingTypeBemjson(data) {
        return {
            val: data.name,
            text: data.title,
        };
    }

    /**
     * @param  {Array} available
     * @param  {Array} all
     * @return {Array}
     */
    function getRenolitOptions(available, all) {
        var options = [
            {
                val: null,
                text: 'Выберите',
            },
        ];

        if (available.length) {
            var onRequest = all.filter(function(colorFromAll) {
                return !available.some(function(colorfromAvailable) {
                    return colorfromAvailable.code === colorFromAll.code;
                });
            });

            options.push(
                {
                    title: 'В наличии',
                    group: available.map(getColorRenolitItem),
                },
                {
                    title: 'Под заказ, 10 дн.',
                    group: onRequest.map(getColorRenolitItem),
                }
            );
        } else {
            options = options.concat(all.map(getColorRenolitItem));
        }

        return options;
    }

    /**
     * @param  {Object} data
     * @return {Object}
     */
    function getColorRenolitItem(data) {
        var code = data.code;
        var title = data.title;

        return {
            val: code,
            text: code + ' "' + title + '"',
            icon: {
                block: 'icon',
                url: '/public/images/colors/' + code + '.jpg',
                mix: {
                    block: 'color-picker',
                    elem: 'select-icon',
                },
            },
        };
    }

    /**
     * @param  {Object} colors
     * @return {Array}
     */
    function getRalOptions(colors) {
        var options = [
            {
                val: null,
                text: 'Выберите',
            },
        ];

        options = options.concat(Object.keys(colors).map(getColorRalItem.bind(this, colors)));

        return options;
    }

    /**
     * @param  {Object} hex
     * @param  {String} code
     * @return {Object}
     */
    function getColorRalItem(hex, code) {
        return {
            val: code,
            text: code,
            icon: {
                block: 'icon',
                attrs: {
                    style: 'background-color: ' + hex[code] + ';',
                },
                mix: {
                    block: 'color-picker',
                    elem: 'select-icon',
                },
            },
        };
    }

    /**
     * @param  {String} coatingType
     * @param  {String} color
     * @return {Boolean}
     */
    function getIsPicked(coatingType, color) {
        if (coatingType === 'pure-pvc') {
            return true;
        }

        if (coatingType === 'renolit' && color) {
            return true;
        }

        if (coatingType === 'ral' && color) {
            return true;
        }

        return false;
    }

    /**
     * @param  {Object} productData
     * @param  {String} color
     * @param  {String} coatingType
     * @param  {Array} colorsRenolit
     * @return {Object}
     */
    function getDescriptionData(productData, color, coatingType, colorsRenolit) {
        var data = {};
        var coating = productData.coating.filter(function(coatingData) {
            return coatingData.name === coatingType;
        })[0];

        if (coatingType === 'pure-pvc') {
            data = {coating: coating};
        } else if (coatingType === 'renolit') {
            data = {
                coating: coating,
                color: colorsRenolit.filter(function(colorData) {
                    return String(colorData.code) === color;
                })[0],
            };
        } else if (coatingType === 'ral') {
            data = {
                coating: coating,
                color: color,
            };
        }

        return data;
    }

    /**
     * @param  {String} coatingType
     * @param  {String} color
     * @param  {Array} colorsRenolit
     * @param  {Object} colorsRal
     * @return {Object}
     */
    function getColorElemData(coatingType, color, colorsRenolit, colorsRal) {
        var data;

        if (!color) {
            return {};
        }

        if (coatingType === 'renolit') {
            data = colorsRenolit.filter(function(colorData) {
                return String(colorData.code) === color;
            })[0];
        } else if (coatingType === 'ral') {
            data = {
                code: color,
                hex: colorsRal[color],
            };
        }

        return data || {};
    }
};
