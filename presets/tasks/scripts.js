const { env, projectRoot } = require('gulp-tasks-preset');
const path =require('path');
const webpack =require('webpack');
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const webpackConfig = require(projectRoot(`webpack.config.js`));

if ( env.matches(/dev|local/i) ) {
  webpackConfig.devtool = 'source-map';
}

module.exports = {

  name: 'scripts',


  task: done => webpack(webpackConfig, (err, stats) => {
    if(err) { throw(err); }
    else {
      gutil.log("[webpack]", stats.toString({}));
      browserSync.reload();
      done();
    }
  }),


  deps: [ 'lint-scripts' ],


  watch: 'src/scripts/**/*.js',


}
