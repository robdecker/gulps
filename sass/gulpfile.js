// Include Gulp
var gulp = require('gulp'),

// Include Plug-ins
globbing = require('gulp-css-globbing'),
prefix = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
watch = require('gulp-watch'),
util = require('gulp-util');

// Copy SASS/CSS libraries to initialize build system.
// Only needs to be run once, or after an update to any Bower components.
gulp.task('copy:sass', function() {
  return gulp.src([
      'bower_components/susy/**/*',
      'bower_components/include-media/dist/*'
    ], {
      base: 'bower_components',
      dot: true
    })
    .pipe(gulp.dest('sass/vendor'));
});

// Sass files
gulp.task('sass', function() {
  var s = sass();
  s.on('error', function(e) {
    util.beep();
    util.log(e);
    s.emit('end');
  });

  return gulp.src([
      'sass/*.scss'
    ])
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
    .pipe(s)
    .pipe(sourcemaps.write())
    .pipe(prefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulp.dest('css'));
});

// Default gulp task
gulp.task('default', ['sass'], function() {
  gulp.watch('sass/**/*.scss', ['sass']);
});
