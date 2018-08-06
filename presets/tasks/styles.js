const { env, projectRoot, onStreamError, gulpIf } = require('gulp-tasks-preset');
let gulp = require('gulp');
let sass = require('gulp-sass');
let sasslint = require('gulp-sass-lint');
let sourcemaps = require('gulp-sourcemaps');
let combineMq = require('gulp-combine-mq');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync');

let isDev = env.matches(/local|dev/i);
let src = 'src/styles/main.scss';
let dest = 'dist/styles';

module.exports = {

  name: 'styles',

  task: (done) => {

    return gulp.src(src)
            .pipe(onStreamError('Styles Task Failed!'))
            .pipe(gulpIf( isDev, sourcemaps.init() ))
            .pipe(sass().on('error', sass.logError))
              .pipe( gulpIf( !isDev, combineMq()) )
              .pipe( gulpIf( !isDev, autoprefixer()) )
              .pipe( gulpIf( !isDev, cleanCSS()) )
            .pipe(gulpIf( isDev, sourcemaps.write('.') ))
            .pipe(gulp.dest(dest).on('end', onStylesDone));
  },

  watch: 'src/styles/**/*.scss',

  deps: ['lint-styles'],

};



// HELPERS
// ------------------------------------------------

function onStylesDone() {
  if ( browserSync.initialized ) {
    this.pipe(browserSync.stream());
  }
}
