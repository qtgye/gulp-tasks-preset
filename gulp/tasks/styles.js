let { isLocal, isDevelopment, isProduction, isWatching,
      browserSync, gulpif, onStreamError, projectRoot } = require('../helpers.js');
let gulp = require('gulp');
let sass = require('gulp-sass');
let sasslint = require('gulp-sass-lint');
let sourcemaps = require('gulp-sourcemaps');
let combineMq = require('gulp-combine-mq');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let notifier = require('node-notifier');

let isDev = isLocal || isDevelopment ? true : false;
let src = projectRoot('source/styles/main.scss');
let dest = projectRoot('dist/styles');

module.exports = {

  fn: async function () {
    return gulp.src(src)
            .pipe(onStreamError('Styles Task Failed!'))
            .pipe(gulpif( isDev, sourcemaps.init() ))
            .pipe(sass().on('error', sass.logError))
              .pipe( gulpif( isProduction, combineMq()) )
              .pipe( gulpif( isProduction, autoprefixer()) )
              .pipe( gulpif( isProduction, cleanCSS()) )
            .pipe(gulpif( isDev, sourcemaps.write('.') ))
            .pipe(gulpif( isWatching && browserSync.initialized, browserSync.stream() ))
            .pipe(gulp.dest('dist/styles').on('end', function () {
              notifier.notify({ title: 'Gulp', message: 'Styles Task Finished!' });
            }));
  },

  watchFiles: projectRoot('source/styles/**/*.scss'),

  deps: ['lint-styles'],

};