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
            block: 'confirmer',
            elem: 'modal',
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
    ],
}]);
