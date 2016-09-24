var gulp = require('gulp'),
    path = require('path'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat-sourcemap'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch');

    // Paths
var config = {
    vendor : {
        src: [
            './node_modules/angular/angular.min.js',
            './node_modules/angular-ui-router/release/angular-ui-router.min.js'
        ],
        dest: './js/vendor'
    },
    app: {
        src: ['./core/*.ts', './app/**/*.module.ts', './app/**/*.ts'],
        project: ts.createProject('./tsconfig.json'),
        dest: './js/app'
    }
}

gulp.task('scripts:app',
    function () {
        var tsResult = gulp.src(config.app.src, { base: './'})
                .pipe(sourcemaps.init())
                .pipe(config.app.project());

        return tsResult.js
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.app.dest));
    });

gulp.task('scripts:vendor',
    function() {
        gulp.src(config.vendor.src)
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest(config.vendor.dest));
    });


gulp.task('build', ['scripts:app', 'scripts:vendor']);
gulp.task('default', ['scripts:app', 'scripts:vendor']);