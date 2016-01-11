var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('styles', function() {
    gulp.src('app/themes/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(function(f) {
            gutil.log(f.base);
            return f.base;
        }))
});

//Watch task
gulp.task('default',function() {
    gulp.watch('app/themes/**/*.scss',['styles']);
});