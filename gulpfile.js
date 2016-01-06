var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var order = require('gulp-order');
var less = require('gulp-less');
var sequence = require('run-sequence');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var htmlMin = require('gulp-minify-html');
var colorguard = require('gulp-colorguard');
var bower = require('gulp-bower');
var gulpFilter = require('gulp-filter');

var SOURCE_DIR = 'src';
var TARGET_DIR = 'strichliste-web';

var ENV = process.env.NODE_ENV;

var bowerComponents = {
    js: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/ng-idle/angular-idle.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-translate/angular-translate.js',
        'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'bower_components/messageformat/messageformat.js',
        'bower_components/messageformat/locale/*.js',
        'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
        'bower_components/Chart.js/Chart.js',
        'bower_components/angular-chart.js/dist/angular-chart.js',
        //'bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.js',
        'src/script/ext/*'
    ],
    css: [
        'bower_components/bootswatch-dist/css/bootstrap.css',
        'bower_components/angular-chart.js/dist/angular-chart.css',
        'bower_components/angular/angular-csp.css'
    ]
};

function isProduction () {
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
        .pipe(gulp.dest(TARGET_DIR + '/locales/'));
});

gulp.task('bower_components', function () {
    return bower();
});

gulp.task('scripts', ['bower_components'], function () {
    var jsFilter = gulpFilter(bowerComponents.js);
    return gulp
        .src(bowerComponents.js)
        .pipe(concat('external.js'))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(TARGET_DIR + '/js'))
        .pipe(jsFilter.restore());
});

gulp.task('style', ['bower_components'], function () {
    var cssFilter = gulpFilter(bowerComponents.css);

    return gulp
        .src(bowerComponents.css)
        .pipe(concat('external.css'))
        .pipe(gulpIf(isProduction, cssmin({ processImport: false  })))
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
        .pipe(gulpIf(isProduction, ngAnnotate()))
        .pipe(gulpIf(isProduction, uglify()))
        .pipe(gulp.dest(TARGET_DIR + '/js'));
});

gulp.task('settings', function() {
    return gulp
        .src('settings.js')
        .pipe(gulp.dest(TARGET_DIR + '/js'));
});

gulp.task('build', function (callback) {
    sequence('clean', ['html', 'static', 'locales', 'images', 'style_app', 'scripts', 'style', 'scripts_app'], 'settings', callback);
});

gulp.task('dev', ['build'], function (callback) {
    ENV = 'development';

    gulp.watch(SOURCE_DIR + '/**/*.html', ['html']);
    gulp.watch(SOURCE_DIR + '/style/**/*.less', ['style_app']);
    gulp.watch(SOURCE_DIR + '/script/**/*.js', ['scripts_app']);
    gulp.watch(SOURCE_DIR + '/img/**/*', ['images']);
    gulp.watch(SOURCE_DIR + '/locales/*', ['locales']);
    gulp.watch('settings.js', ['settings']);

    callback();
});
