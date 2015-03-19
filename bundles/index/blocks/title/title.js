'use strict';

modules.define(
'i-bem__dom',
['events__channels', 'jquery'],
function (provide, channel, $, BEMDOM) {

BEMDOM.decl('title', {
    onSetMod: {
        js: {
            inited: function () {
                var $header = this.findBlockOutside('header').elem('top-line');

                this.headerBottom = $header.offset().top + $header.height();
                this.offsetTop = this.domElem.offset().top;

                $(window)
                    .scroll(this.checkLogoPosition.bind(this))
                    .scroll();
            }
        }
    },

    checkLogoPosition: function () {
        if (this.isLogoCoveredByHeader()) {
            channel('main-menu').emit('logo-is-covered-by-header');
        } else {
            channel('main-menu').emit('logo-is-not-covered-by-header');
        }
    },

    isLogoCoveredByHeader: function () {
        var logoTop = this.offsetTop - $(window).scrollTop();

        return logoTop <= this.headerBottom;
    }
});

provide(BEMDOM);

});
