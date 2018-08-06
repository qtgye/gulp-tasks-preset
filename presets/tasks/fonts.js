const gulp = require('gulp');
const src = 'src/fonts/**/*.*';

module.exports = {


  name: 'fonts',


  description: 'Simply copies the font files',


  task: () => {
    return gulp.src(src)
        .pipe(gulp.dest('dist/fonts'));
  },


  watch: src,


};
