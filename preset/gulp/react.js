let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('gulp-tasks-preset');

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let webpack = require('webpack');
let gulpWebpack = require('webpack-stream');
let notifier = require('node-notifier');

let src = projectRoot('src/app.js');
let dest = projectRoot('public/js');
let output = projectRoot('public/js/app.js');
let isDev = isDevelopment || isLocal ? true : false;
let isProd = isStaging || isProduction ? true : false;
let webpackConfig = require('../webpack.config.js');

if ( isDev ) {
  webpackConfig.devtool = 'source-map';
}

module.exports = {

  fn: async function () {
    gulp.src(src)
      .pipe(plumber(console.log.bind(console)))
      .pipe(gulpWebpack(webpackConfig, webpack))
      .pipe(gulp.dest(dest).on('end', function () {
        console.log(`Done!`.green);
      }));
  },


  watchFiles: projectRoot('src/**/*.js'),


}