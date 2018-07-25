let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let gulp = require('gulp');
let src = projectRoot('source/fonts/**/*.*');
let dest = 'dist/images';

module.exports = {

  fn: async function () {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
  },

  watchFiles: projectRoot(src),

}