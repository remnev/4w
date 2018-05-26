'use strict';

modules.define(
'i-bem__dom',
['events__channels'],
function(provide, channel, BEMDOM) {
    BEMDOM.decl('header', {
        onSetMod: {
            js: {
                inited: function() {
                    this.topLine = this.elem('top-line');

                    channel('main-menu').on('logo-is-covered-by-header', this.fixMenu, this);
                    channel('main-menu').on('logo-is-not-covered-by-header', this.unfixMenu, this);
                },
            },
        },

        fixMenu: function() {
            if (!this.hasMod(this.topLine, 'fixed')) {
                this.setMod(this.topLine, 'fixed');
            }
        },

        unfixMenu: function() {
            if (this.hasMod(this.topLine, 'fixed')) {
                this.delMod(this.topLine, 'fixed');
            }
        },
    });

    provide(BEMDOM);
});
