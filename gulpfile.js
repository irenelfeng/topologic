'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var b = browserify({
  entries: ['./app/main.js']
}).transform(babelify, { presets: [ "es2015", "react" ] });

/*
 * JS build task
 */
gulp.task('js', function () {
  return b.bundle()
    .pipe(source('./app/main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

/*
 * Styl build task
 */
gulp.task('styl', function () {
  return gulp.src('./app/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build'));
});

/*
 * Watch
 */
gulp.task('watch', function() {
  gulp.watch('app/**.js', ['js']);
  gulp.watch('app/**.styl', ['styl']);
});

/*
 * Default
 */
gulp.task('build', ['js', 'styl']);
gulp.task('bw', ['js', 'styl', 'watch']);