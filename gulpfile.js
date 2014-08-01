var gulp              = require('gulp'),
    concat            = require('gulp-concat'),
    util              = require('gulp-util'),
    closure            = require('gulp-closure-compiler-service'),
    bower_files       = require('main-bower-files');

var SRC   = 'src/*.js';

gulp.task('vendor', function() {

  return gulp.src(bower_files(), { base: 'bower_components' })
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build/vendor'));

});

gulp.task('build', ['vendor'], function() {
  return  gulp.src(['build/vendor/vendor.js', 'src/*.js'])
          .pipe(concat('pagenote.dev.js'))
          .pipe(gulp.dest('build'));
});

gulp.task('minify', ['build'], function() {
  return  gulp.src('build/pagenote.dev.js')
          .pipe(closure())
          .pipe(concat('pagenote.min.js'))
          .pipe(gulp.dest('build'));
});

gulp.task('default', ['minify']);
