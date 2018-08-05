'use strict';

module.exports = function(bh) {
    bh.match('color-picker__color_type_pure-pvc', function(ctx, json) {
        ctx.attrs({title: 'Образец цвета: Белый ПВХ без покрытия'});
    });

    bh.match('color-picker__color_type_renolit', function(ctx, json) {
        ctx.attrs({
            title: [
                'Образец цвета: код ',
                json.data.code,
                ' "',
                json.data.title,
                '"',
            ].join(''),
            style: [
                'background-image: url(\'/public/images/colors/',
                json.data.code,
                '.jpg\');',
            ].join(''),
        });
    });

    bh.match('color-picker__color_type_ral', function(ctx, json) {
        ctx.attrs({
            title: 'Образец цвета: код ' + json.data.code,
            style: 'background-color: ' + json.data.hex,
        });
    });
};
