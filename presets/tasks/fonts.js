let { projectRoot } = require('gulp-tasks-preset');

let gulp = require('gulp');
let src = projectRoot('src/fonts/**/*.*');
let dest = 'dist/fonts';

module.exports = {

  name: 'fonts',

  task: function () {
    return gulp.src(src)
        .pipe(gulp.dest(dest));
  },

  watch: src,

}
