require('colors');
let gulp = require('gulp');
let minimist = require('minimist');
let dotenv = require('dotenv');
let plumber = require('gulp-plumber');
let notifier = require('node-notifier');
let through = require('through2');
let browserSync = require('browser-sync');

let projectRoot = process.cwd();
let args = minimist(process.argv.slice(2));
let env = dotenv.config();


if ( env.error ) {
  throw new Error(env.error.message.red);
}



/**
 * --------------------------------------------------------------------------------------------
 * THINGS NEED NOT BE EXPORTED
 * --------------------------------------------------------------------------------------------
 */

// Provide a way to access current task
gulp.Gulp.prototype.__runTask = gulp.Gulp.prototype._runTask;
gulp.Gulp.prototype._runTask = function(task) {
  this.currentTask = task;
  this.__runTask(task);
}



/**
 * --------------------------------------------------------------------------------------------
 * THINGS NEED TO BE EXPORTED
 * --------------------------------------------------------------------------------------------
 */
module.exports = {

  projectRoot: (path = '') => `${projectRoot}/${path.trim('/')}`,
  args,
  env: env.parsed,
  isWatching: args._.includes('watch'),

  // Environments
  isLocal: /^(local)$/i.test(env.parsed.ENV),
  isDevelopment: /(dev|development)/i.test(env.parsed.ENV),
  isStaging: /s(taging)/i.test(env.parsed.ENV),
  isProduction: !env.parsed.ENV || /(production)/i.test(env.parsed.ENV) ? true : false,


  onStreamError: function (title = null) {
    return plumber({
      errorHandler: error => {
        notifier.notify({
          'title': title || 'Error in Pipe!',
          'message': error.message,
        });
        console.log(title.red);
        console.log(error.message);
        console.log(error.stack.gray);
      }
    });
  },


  gulpif: function ( condition = false, ifStream, elseStream ) {
    elseStream = typeof elseStream === 'function' ? elseStream :
                    through.obj(function (file, enc, callback) {
                      this.push(file);
                      callback();
                    });
    return condition ? ifStream : elseStream;
  },


  browserSync: browserSync.create(),

};
