require('colors');
let gulp = require('gulp');
let minimist = require('minimist');
let dotenv = require('dotenv');
let plumber = require('gulp-plumber');
let notifier = require('node-notifier');
let through = require('through2');
let browserSync = require('browser-sync').create();

let projectRoot = process.cwd();
let args = minimist(process.argv.slice(2));
let env = dotenv.config().parsed;
let isWatching = args._.includes('watch');


if ( !env ) throw new Error('A .env file is required!'.red);


// Environments
let isLocal =  /^(local)$/i.test(env.ENV);
let isDevelopment =  /(dev|development)/i.test(env.ENV);
let isStaging =  /s(taging)/i.test(env.ENV);
let isProduction =  !env.ENV || /(production)/i.test(env.ENV) ? true : false;

let tasks = [];



/**
 * --------------------------------------------------------------------------------------------
 * EXPORTS
 * --------------------------------------------------------------------------------------------
 */
module.exports = {

  args,
  env,
  isWatching,
  browserSync,

  // Environments
  isLocal,
  isDevelopment,
  isStaging,
  isProduction,


  get tasks() { return tasks },


  projectRoot: (path = '') => `${projectRoot}/${path.trim('/')}`,


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


  registerTasks: function ( tasksList = [], tasksDirectory = 'gulp' ) {

    // Parse task files
    tasks = tasksList.map( taskName => {
      tasksDirectory = tasksDirectory.trim('/');
      let task = require(`${projectRoot}/${tasksDirectory}/${taskName}.js`);
      return {
        name: taskName,
        fn: task.fn,
        watchFiles: task.watchFiles,
        watchFn: task.watchFn,
        deps: task.deps,
      };
    });

    // Register to gulp
    for ( let task of tasks ) {
      if ( !task.fn ) continue;
      task.deps = Array.isArray(task.deps) ? task.deps : [];
      gulp.task(task.name, task.deps, task.fn)
    }

    // Default task
    gulp.task('default', tasks.map( task => task.name ));

    // Watch task
    if ( isWatching ) require(`${projectRoot}/${tasksDirectory}/watch.js`);

  },

};
