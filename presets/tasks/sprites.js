let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let svgSprite = require('gulp-svg-sprite');
let imagemin = require('gulp-imagemin');
let gulp = require('gulp');

let src = projectRoot('source/images/icons/**/*.svg');
let dest = 'dist'

module.exports = {

  fn: async function () {
    return gulp.src(src)
            .pipe(imagemin())
            .pipe(svgSprite({
              mode: {
                symbol: true,
              },
              preview: false,
            }))
            .pipe(gulp.dest(dest));
  },


  watchFiles: src,


}
