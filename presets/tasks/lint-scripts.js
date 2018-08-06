let gulp = require('gulp');
let jshint = require('gulp-jshint');

let src = 'src/scripts/**/*.js';


module.exports = {


  name: 'lint-scripts',


  description: 'Validates scripts according to linting standards.',


  task: done => {
    return gulp.src(src)
            .pipe(jshint())
            .on('end', () => done())
            .pipe(jshint.reporter('jshint-stylish'));
  },


  env: /(dev|local)/i,


};
