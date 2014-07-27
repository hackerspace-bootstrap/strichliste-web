var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var order = require('gulp-order');
var less = require('gulp-less');
var sequence = require('run-sequence');
var ngannotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

var SOURCE_DIR = 'src';
var TARGET_DIR = 'build';

gulp.task('clean', function (callback) {
    return gulp
        .src(TARGET_DIR)
        .pipe(clean());
});

gulp.task('style_ext', function () {
    return gulp
        .src(SOURCE_DIR + '/style/ext/*.css')
        .pipe(order([
            'normalize-*',
            'bootstrap.css',
            'bootstrap-responsive.css'
        ]))
        .pipe(concat('external.css'))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('style_app', function () {
    return gulp
        .src(SOURCE_DIR + '/style/*.less')
        .pipe(less())
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('images', function () {
    return gulp
        .src(SOURCE_DIR + '/img/*')
        .pipe(gulp.dest(TARGET_DIR + '/img'));
});

gulp.task('html', function () {
    return gulp
        .src(SOURCE_DIR + '/**/*.html')
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('scripts_ext', function () {
    return gulp
        .src(SOURCE_DIR + '/script/ext/*')
        .pipe(order([
            'jquery-*.js',
            'angular.js',
            'angular-translate.js',
            'bootstrap.js'
        ]))
        .pipe(concat('external.js'))
        .pipe(uglify())
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('scripts_app', function () {
    return gulp
        .src(SOURCE_DIR + '/script/app.js')
        .pipe(browserify())
        .pipe(ngannotate())
        .pipe(uglify())
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('build', function(callback) {
    sequence('clean', ['html', 'images', 'style_app', 'style_ext', 'scripts_ext', 'scripts_app'], callback);
});

gulp.task('dev', function(callback) {
    sequence('clean', ['html', 'images', 'style_ext', 'style_app', 'scripts_ext', 'scripts_app'], function() {
        gulp.watch(SOURCE_DIR + '/**/*.html', ['html']);
        gulp.watch(SOURCE_DIR + '/style/**/*.less', ['style_app']);
        gulp.watch(SOURCE_DIR + '/script/**/*.js', ['scripts_app']);
        gulp.watch(SOURCE_DIR + '/img/**/*', ['images']);

        callback();
    });
});
