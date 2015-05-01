([{
    tech: 'js',
    mustDeps: [
        {
            block: 'modal',
            tech: 'bh'
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: ['pseudo', 'action']
            },
            tech: 'bh'
        },
        {
            block: 'radio-group',
            mods: {
                theme: 'islands',
                size: 's',
                type: 'button'
            },
            tech: 'bh'
        },
        {
            block: 'select',
            mods: {
                mode: 'radio',
                theme: 'islands',
                size: 's'
            },
            tech: 'bh'
        },
        {
            block: 'input',
            mods: {
                theme: 'islands',
                size: 's'
            },
            tech: 'bh'
        },
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 's'
            },
            tech: 'bh'
        }
    ]
}, {
    shouldDeps: [
        {
            block: 'events',
            elem: 'channels'
        },
        {block: 'bh'},
        {
            block: 'modal',
            mods: {theme: 'islands'}
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: ['pseudo', 'action']
            }
        },
        {
            block: 'radio-group',
            mods: {
                theme: 'islands',
                size: 's',
                type: 'button'
            }
        },
        {
            block: 'select',
            mods: {
                mode: 'radio',
                theme: 'islands',
                size: 's'
            }
        },
        {
            block: 'input',
            mods: {
                theme: 'islands',
                size: 's'
            }
        },
        {
            block: 'textarea',
            mods: {
                theme: 'islands',
                size: 's'
            }
        }
    ]
}]);
