'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var bower = require('gulp-bower');
var vowFs = require('vow-fs');
var del = require('del');
var path = require('path');
var MakePlatform = require('enb/lib/make');
var runSequence = require('run-sequence');

var paths = {
    rebuild: [],
    lintServer: [
        '.enb/*.js',
        'controllers/**/*.js',
        'models/**/*.js',
        'middlewares/**/*.js',
        'index.js'
    ],
    lintClient: [
        'blocks/**/*.js',
        'bundles/*/blocks/**/*.js',
    ],
    test: [
        'test/*.js'
    ],
    coverage: [
        'controllers/**/*.js',
        'lib/**/*.js',
        // 'middleware/**/*.js',
        'models/**/*.js',
        '*.js'
    ],
    vendors: 'vendors'
};

gulp.task('eslint-server', function () {
    return gulp.src(paths.lintServer)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('eslint-client', function () {
    return gulp.src(paths.lintClient)
        .pipe(eslint('./.eslintrc-client'))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint', ['eslint-server', 'eslint-client']);

// Vendors
gulp.task('vendors', function () {
    return bower(paths.vendors);
});

// Build
// TODO: publish to npm as gulp-clean-bembundles
gulp.task('clean', function () {
    return vowFs.glob('bundles/*')
        .then(function (bundles) {
            var clearBundles = bundles.map(function (bundle) {
                return cleanBundle(bundle);
            });

            return Promise.all(clearBundles);
        });

    function cleanBundle(bundle) {
        var bundleName = bundle.split('/').pop();
        var bemdeclPath = path.join(bundle, bundleName + '.server.bemdecl.js');

        return vowFs.exists(bemdeclPath)
            .then(function (isBemdeclExist) {
                if (isBemdeclExist) {
                    // Clean the bundle
                    return del([
                        path.join(bundle, '*'),
                        '!' + bemdeclPath,
                        '!' + path.join(bundle, 'blocks')
                    ]);
                }

                // remove the bundle if it hasn't a `.bemdecl.js` file
                return vowFs.removeDir(bundle);
            });
    }
});

gulp.task('rebuild', function () {
    var make = new MakePlatform();

    return make.init(process.cwd())
        .then(function () {
            make.loadCache();

            return make.build([]);
        })
        .then(function () {
            make.saveCache();
            make.destruct();
        });
});

gulp.task('build', function (done) {
    runSequence('clean', 'vendors', 'rebuild', done);
});
