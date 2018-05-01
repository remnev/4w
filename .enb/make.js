'use strict';

var techs = {
    levels: require('enb-bem-techs/techs/levels'),
    fileProvider: require('enb/techs/file-provider'),
    bemdeclFromDepsByTech: require('enb-bem-techs/techs/deps-by-tech-to-bemdecl'),
    borschik: require('enb-borschik/techs/borschik'),
    deps: require('enb-bem-techs/techs/deps'),
    files: require('enb-bem-techs/techs/files'),
    stylusWithAutoprefixer: require('enb-stylus/techs/stylus'),
    js: require('enb/techs/js'),
    bhClientModule: require('enb-bh/techs/bh-bundle'),
    bhServer: require('enb-bh/techs/bh-commonjs'),
    fileMerge: require('enb/techs/file-merge'),
    fileCopy: require('enb/techs/file-copy'),
    prependModules: require('enb-modules/techs/prepend-modules')
};

module.exports = function (config) {
    config.nodes('bundles/*');

    config.nodeMask(/bundles\/.*/, function (nodeConfig) {
        nodeConfig.addTechs([
            [techs.levels, {levels: getLevels(config)}],
            // server bemdecl
            [techs.fileProvider, {target: '?.server.bemdecl.js'}],
            // browser bemdecl
            [
                techs.bemdeclFromDepsByTech,
                {
                    target: '?.browser.bemdecl.js',
                    sourceTech: 'js',
                    destTech: 'bh'
                }
            ],
            // server deps.js
            [
                techs.deps,
                {
                    bemdeclFile: '?.server.bemdecl.js',
                    target: '?.server.deps.js'
                }
            ],
            // browser deps.js
            [
                techs.deps,
                {
                    bemdeclFile: '?.browser.bemdecl.js',
                    target: '?.browser.deps.js'
                }
            ],
            // server files
            [techs.files, {depsFile: '?.server.deps.js'}],
            // browser files
            [
                techs.files,
                {
                    depsFile: '?.browser.deps.js',
                    filesTarget: '?.browser.files',
                    dirsTarget: '?.browser.dirs'
                }
            ],
            [techs.stylusWithAutoprefixer, {
                browsers: [
                    'last 2 versions',
                    'ie 10',
                    'ff 24',
                    'opera 12.16'
                ]
            }],
            [
                techs.js,
                {
                    sourceSuffixes: ['vanilla.js', 'browser.js', 'js']
                }
            ],
            // browser js + ymodules system
            [
                techs.prependModules,
                {
                    target: '?.js+ymodules.js',
                    source: '?.js'
                }
            ],
            // pure browser bh
            [
                techs.bhClientModule,
                {
                    target: '?.browser.pure.bh.js',
                    filesTarget: '?.browser.files',
                    bhOptions: {
                        jsAttrName: 'data-bem',
                        jsAttrScheme: 'json'
                    }
                }
            ],
            // pure browser bh + js + ymodules system
            [
                techs.fileMerge,
                {
                    sources: [
                        '?.js+ymodules.js',
                        '?.browser.pure.bh.js'
                    ],
                    target: '?.browser.js'
                }
            ],

            // server bh
            [
                techs.bhServer,
                {
                    target: '?.server.bh.js',
                    bhOptions: {
                        jsAttrName: 'data-bem',
                        jsAttrScheme: 'json'
                    }
                }
            ]
        ]);

        nodeConfig.mode('development', function (nodeConfig) {// eslint-disable-line no-shadow
            nodeConfig.addTechs([
                [
                    techs.fileCopy,
                    {
                        sourceTarget: '?.css',
                        destTarget: '_?.css'
                    }
                ],
                [
                    techs.fileCopy,
                    {
                        sourceTarget: '?.browser.js',
                        destTarget: '_?.browser.js'
                    }
                ]
            ]);
        });

        nodeConfig.mode('production', function (nodeConfig) {// eslint-disable-line no-shadow
            nodeConfig.addTechs([
                [
                    techs.borschik,
                    {
                        sourceTarget: '?.browser.js',
                        destTarget: '_?.browser.js',
                        minify: true,
                        freeze: true
                    }
                ],
                [
                    techs.borschik,
                    {
                        sourceTarget: '?.css',
                        destTarget: '_?.css',
                        minify: true,
                        freeze: true
                    }
                ]
            ]);
        });

        nodeConfig.addTargets([
            //  server bh
            '?.server.bh.js',

            //  browser (js + client bh)
            '_?.browser.js',
            '_?.css'
        ]);
    });
};

function getLevels(config) {
    var levels = [
        {
            path: 'vendors/bem-core/common.blocks',
            check: false
        },
        {
            path: 'vendors/bem-core/desktop.blocks',
            check: false
        },
        {
            path: 'vendors/bem-components/common.blocks',
            check: false
        },
        {
            path: 'vendors/bem-components/desktop.blocks',
            check: false
        },
        {
            path: 'vendors/bem-components/design/common.blocks',
            check: false
        },
        {
            path: 'vendors/bem-components/design/desktop.blocks',
            check: false
        },
        {
            path: 'vendors/bem-stat-counters/common.blocks',
            check: false
        },
        {
            path: 'vendors/bem-history/common.blocks',
            check: false
        },
        'blocks',
        'bundles'
    ];

    return levels.map(function (levelPath) {
        return config.resolvePath(levelPath);
    });
}
