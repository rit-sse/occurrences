var gulp = require('gulp');
var paths = require('../config');
var del = require('del');

gulp.task('clean', function(cb){
  del([paths.build.all], cb);
});
