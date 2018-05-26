([{
    tech: 'js',
    mustDeps: [
        {
            block: 'modal',
            tech: 'bh',
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: ['pseudo', 'action'],
            },
            tech: 'bh',
        },
        {
            block: 'counter',
            mods: {'item-counter': true},
            tech: 'bh',
        },
        {
            block: 'input',
            tech: 'bh',
        },
        {
            block: 'item-deleter',
            tech: 'bh',
        },
        {
            block: 'link',
            mods: {
                theme: 'islands',
                pseudo: true,
            },
            tech: 'bh',
        },
    ],
}, {
    shouldDeps: [
        {
            block: 'events',
            elem: 'channels',
        },
        {block: 'bh'},
        {
            block: 'modal',
            mods: {theme: 'islands'},
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: ['pseudo', 'action'],
            },
        },
        {
            block: 'counter',
            mods: {'item-counter': true},
        },
        {block: 'input'},
        {block: 'item-deleter'},
        {block: 'jquery'},
        {
            block: 'link',
            mods: {
                theme: 'islands',
                pseudo: true,
            },
        },
    ],
}]);
