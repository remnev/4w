'use strict';

module.exports = function(bh) {
    bh.match('color-picker__picked-color-description_type_pure-pvc', function(ctx, json) {
        ctx.content('— ' + bh.xmlEscape(json.data.coating.title));
    });

    bh.match('color-picker__picked-color-description_type_renolit', function(ctx, json) {
        if (!json.data.color) {
            return;
        }

        var xmlEscape = bh.xmlEscape;
        var content = [
            '— ' + xmlEscape(json.data.coating.title),
            ' (код: ',
            xmlEscape(json.data.color.code),
            ' "',
            xmlEscape(json.data.color.title),
            '")',
        ];

        ctx.content(content);
    });

    bh.match('color-picker__picked-color-description_type_ral', function(ctx, json) {
        if (!json.data.color) {
            return;
        }

        var xmlEscape = bh.xmlEscape;
        var content = [
            '— ' + xmlEscape(json.data.coating.title),
            ' (код: ',
            xmlEscape(json.data.color),
            ')',
        ];

        ctx.content(content);
    });
};
