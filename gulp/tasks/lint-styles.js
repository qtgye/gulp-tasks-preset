let { isLocal, isDevelopment, isProduction, isWatching,
      browserSync, gulpif, onStreamError, projectRoot } = require('../helpers.js');
let gulp = require('gulp');
let src = projectRoot('source/styles/**/*.scss');
let sassLint = require('gulp-sass-lint');

module.exports = {

  fn: async function () {
    return gulp.src(src)
            .pipe(sassLint())
            .pipe(sassLint.format())
            .pipe(sassLint.failOnError());
  },

  watchFiles: src,

};