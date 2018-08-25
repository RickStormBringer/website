/**
 * @Description: Author Message
 * @author huyangyang
 * @date 2018/8/25
 */
var gulp = require('gulp'),
    rev = require('gulp-rev'),
    revC = require('gulp-rev-collector'),
    cssMin = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    clearAll = require('del'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin');


gulp.task('default', ['clearAll', 'dev']);

// entry
gulp.task('dev', function (done) {
    runSequence(
        ['clearAll'],
        ['revCss'],
        ['revJs'],
        ['revFonts'],
        ['revImg'],
        ['revHead'],
        ['revBody'],
        done);
});

// paths
var cssSrc = ['./public/css/*.css', './public/css/*.css'],
    jsSrc = ['./public/js/*.js', './public/js/app.js'],
    headSrc = './views/partial/*.ejs',
    bodySrc = './views/*.ejs',
    imgSrc = './public/images/*',
    fontsSrc = './public/fonts/*';

// css build
gulp.task('revCss', function () {
    return gulp.src(cssSrc)
        .pipe(cssMin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/css'));
});


// js build
gulp.task('revJs', function () {
    return gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/js'));
});

// fonts
gulp.task('revFonts', function () {
    return gulp.src(fontsSrc)
        .pipe(gulp.dest('./dist/fonts'));
});

// revImg
gulp.task('revImg', function () {
    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

// replace path
gulp.task('revHead', function () {
    return gulp.src(['dist/**/*.json', headSrc])
        .pipe(revC({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist/views/partial'));
});

gulp.task('revBody', function () {
    return gulp.src(['dist/**/*.json', bodySrc])
        .pipe(revC({replaceReved: true}))
        .pipe(gulp.dest('dist/views'));
});


// clear dist
gulp.task('clearAll', function () {
    clearAll('./dist/*');
});
