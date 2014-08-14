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
var cssmin = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var htmlMin = require('gulp-minify-html');
var colorguard = require('gulp-colorguard');
var bower = require('gulp-bower');
var gulpFilter = require('gulp-filter');

var SOURCE_DIR = 'src';
var TARGET_DIR = 'build';

var ENV = process.env.NODE_ENV;

var bowerComponents = {
    js: [
        'jquery/dist/jquery.js',
        'angular/angular.js',
        'angular-route/angular-route.js',
        'angular-translate/angular-translate.js',
        'angular-translate-loader-static-files/angular-translate-loader-static-files.js'
    ],
    css: [
        'bootswatch-dist/css/bootstrap.css',
        'angular/angular-csp.css'
    ]
};

function isProduction() {
    return ENV === 'production';
}

gulp.task('clean', function (callback) {
    return gulp
        .src(TARGET_DIR)
        .pipe(clean());
});

gulp.task('static', function () {
    return gulp
        .src(SOURCE_DIR + '/static/*')
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('locales', function () {
    return gulp
        .src(SOURCE_DIR + '/locales/*')
        .pipe(gulp.dest(TARGET_DIR +'/locales/'));
});

gulp.task('bower_components', function () {
    var jsFilter = gulpFilter(bowerComponents.js);
    var cssFilter = gulpFilter(bowerComponents.css);

    return bower()
        .pipe(jsFilter)
        .pipe(order(bowerComponents.js))
        .pipe(concat('external.js'))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(TARGET_DIR + '/js'))
        .pipe(jsFilter.restore())

        .pipe(cssFilter)
        .pipe(order(bowerComponents.css))
        .pipe(concat('external.css'))
        .pipe(gulpIf(isProduction, cssmin()))
        .pipe(gulp.dest(TARGET_DIR + '/css/'))
        .pipe(cssFilter.restore());
});

gulp.task('style_app', function () {
    return gulp
        .src(SOURCE_DIR + '/style/*.less')
        .pipe(less()).on('error', gutil.log)
        .pipe(colorguard())
        .pipe(gulpIf(isProduction, cssmin()))
        .pipe(gulp.dest(TARGET_DIR + '/css'));
});

gulp.task('images', function () {
    return gulp
        .src(SOURCE_DIR + '/img/*')
        .pipe(gulp.dest(TARGET_DIR + '/img'));
});

gulp.task('html', function () {
    return gulp
        .src(SOURCE_DIR + '/**/*.html')
        .pipe(gulpIf(isProduction, htmlMin({empty: true})))
        .pipe(gulp.dest(TARGET_DIR));
});

gulp.task('scripts_app', function () {
    return gulp
        .src(SOURCE_DIR + '/script/app.js')
        .pipe(browserify()).on('error', gutil.log)
        .pipe(gulp.dest(TARGET_DIR + '/js'));
});

gulp.task('build', function(callback) {
    sequence('clean', ['html', 'static', 'locales', 'images', 'style_app', 'bower_components', 'scripts_app'], callback);
});

gulp.task('dev', function(callback) {
    ENV = 'development';

    sequence('clean', ['html', 'static', 'locales', 'images', 'style_app', 'bower_components', 'scripts_app'], function() {
        gulp.watch(SOURCE_DIR + '/**/*.html', ['html']);
        gulp.watch(SOURCE_DIR + '/style/**/*.less', ['style_app']);
        gulp.watch(SOURCE_DIR + '/script/**/*.js', ['scripts_app']);
        gulp.watch(SOURCE_DIR + '/img/**/*', ['images']);
        gulp.watch(SOURCE_DIR + '/locales/*', ['locales']);

        callback();
    });
});
