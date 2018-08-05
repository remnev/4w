([{
    tech: 'js',
    mustDeps: [
        {
            elem: 'color',
            tech: 'bh',
        },
        {
            elem: 'picked-color-description',
            tech: 'bh',
        },
    ],
}, {
    mustDeps: [
        {
            block: 'events',
            elem: 'channels',
        },
        {block: 'jquery'},
        {
            block: 'radio-group',
            mods: {
                theme: 'islands',
                size: 'm',
                type: 'button',
            },
        },
        {
            block: 'select',
            mods: {
                mode: 'radio',
                theme: 'islands',
                size: 'm',
            },
        },
        {block: 'icon'},
        {block: 'location'},
        {
            block: 'uri',
            elem: 'querystring',
        },
        {block: 'next-tick'},
    ],
    shouldDeps: [
        {elem: 'color'},
        {elem: 'picked-color-description'},
    ],
}]);
