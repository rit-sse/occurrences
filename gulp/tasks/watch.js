var gulp = require('gulp');
var paths = require('../config');

gulp.task('watch', ['build'], function(){
  gulp.watch(paths.source.scripts, ['build:scripts' ]);
  gulp.watch([paths.source.html], ['build:copy']);
  gulp.watch(paths.source.stylesheets, ['build:less']);
});
