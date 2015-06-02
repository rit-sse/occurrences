var gulp = require('gulp');
var paths = require('../config');

gulp.task('build:copy', function(){
  gulp.src([paths.source.html])
    .pipe(gulp.dest(paths.build.all));
});
