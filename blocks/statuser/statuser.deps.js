([{
    tech: 'js',
    mustDeps: [
        {
            block: 'modal',
            tech: 'bh',
        },
        {
            block: 'spin',
            tech: 'bh',
        },
        {
            block: 'statuser',
            elem: 'modal',
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
    ],
}, {
    shouldDeps: [
        {
            block: 'events',
            elem: 'channels',
        },
        {block: 'bh'},
        {block: 'jquery'},
        {
            block: 'modal',
            mods: {theme: 'islands'},
        },
        {
            block: 'spin',
            mods: {
                theme: 'islands',
                size: 'm',
            },
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: ['pseudo', 'action'],
            },
        },
    ],
}]);
