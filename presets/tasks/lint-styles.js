let gulp = require('gulp');
let src = 'src/styles/**/*.scss';
let sassLint = require('gulp-sass-lint');

module.exports = {


  name: 'lint-styles',


  description: 'Validates SCSS according to the linting standards.',


  task: done => {
    return gulp.src(src)
            .pipe(sassLint())
            .pipe(sassLint.format())
            .on('end', done)
            .pipe(sassLint.failOnError());
  },


  env: /(local|dev)/i,


};
