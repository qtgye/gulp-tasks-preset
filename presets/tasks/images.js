let gulp = require('gulp');
let imagemin = require('gulp-imagemin');
let src = 'src/images/**/*.*';
let dest = 'dist/images';

module.exports = {


  name: 'images',


  description: 'Optimizes images',


  task: function () {
    return gulp.src(src)
              .pipe(imagemin())
              .pipe(gulp.dest(dest));
  },


  watch: src,

}
