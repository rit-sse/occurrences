var gulp = require('gulp');
var paths = require('../config');
var handleErrors = require('../util/handle-errors');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('build:less', function(){
  gulp.src(paths.source.stylesheets)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat('css/app.css'))
    .on('error', handleErrors)
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.build.all));
});
