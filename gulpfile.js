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
    imagemin = require('gulp-imagemin');


gulp.task('default', gulp.series(clear, revCss, revJs, revFonts, revImg, revIcons, revHead, revBody, revAutoHtml, function (done) {
    done()
}));

// paths

var cssSrc = ['./public/css/*.css', './public/css/*.css'],
    jsSrc = ['./public/js/*.js', './public/js/app.js'],
    headSrc = './views/partial/*.ejs',
    bodySrc = './views/*.ejs',
    autoHtmlSrc = './public/*',
    imgSrc = './public/images/*',
    iconsSrc = './public/icons/*',
    fontsSrc = './public/fonts/*';

// revAutoHtml

function revAutoHtml() {
    return gulp.src(autoHtmlSrc)
        .pipe(gulp.dest('./dist'));
}

// css build

function revCss() {
    return gulp.src(cssSrc)
        .pipe(cssMin())
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/css'));
}

// js build

function revJs() {
    return gulp.src(jsSrc)
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./dist/js'));
}

// fonts

function revFonts() {
    return gulp.src(fontsSrc)
        .pipe(gulp.dest('./dist/fonts'));
}

// revImg
function revImg() {
    return gulp.src(imgSrc)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

// revIcons

function revIcons() {
    return gulp.src(iconsSrc)
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/icons'));
}

// replace path

function revHead() {
    return gulp.src(['dist/**/*.json', headSrc])
        .pipe(revC({
            replaceReved: true
        }))
        .pipe(gulp.dest('dist/views/partial'));
}

function revBody() {
    return gulp.src(['dist/**/*.json', bodySrc])
        .pipe(revC({replaceReved: true}))
        .pipe(gulp.dest('dist/views'));
}

function clear() {
    return clearAll('./dist/*');
}
