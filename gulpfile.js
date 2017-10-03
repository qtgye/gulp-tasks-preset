/**
 * --------------------------------------------------------------------------------------------
 * EXTERNAL MODULES
 * --------------------------------------------------------------------------------------------
 */
let gulp = require('gulp');




/**
 * --------------------------------------------------------------------------------------------
 * HELPERS
 * --------------------------------------------------------------------------------------------
 */
let { args, isWatching, isLocal, isDevelopment, isStaging, isProduction,
  projectRoot, browserSync } = require('./gulp/helpers.js');




/**
 * --------------------------------------------------------------------------------------------
 * VARIABLES
 * --------------------------------------------------------------------------------------------
 */

/**
 * List of tasks to run
 * Each task should be the basename of the task's file
 */
let tasks = [
  'styles',
  'scripts'
];


/**
 * Local/Dev-only tasks
 */
let devOnlyTasks = [
  'lint-styles',
  'lint-scripts',
];


/**
 * Staging/Prod-only tasks
 */
let prodOnlyTasks = [];




/**
 * --------------------------------------------------------------------------------------------
 * REQUIRE TASK FILES
 * --------------------------------------------------------------------------------------------
 */

tasks = isLocal || isDevelopment ? devOnlyTasks.concat(tasks) : tasks;
tasks = isStaging || isProduction ? prodOnlyTasks.concat(tasks) : tasks;
tasks = tasks.map( taskName => {
  let task = require(`${projectRoot()}/gulp/tasks/${taskName}.js`);
  return {
    name: taskName,
    fn: task.fn,
    watchFiles: task.watchFiles,
    watchFn: task.watchFn,
    deps: task.deps,
  };
});


/**
 * --------------------------------------------------------------------------------------------
 * REGISTER GULP TASKS
 * --------------------------------------------------------------------------------------------
 */

for ( let task of tasks ) {
  if ( !task.fn ) continue;
  task.deps = Array.isArray(task.deps) ? task.deps : [];
  gulp.task(task.name, task.deps, task.fn)
}

// Default task
gulp.task('default', tasks.map( task => task.name ));


/**
 * --------------------------------------------------------------------------------------------
 * WATCH FILES
 * --------------------------------------------------------------------------------------------
 */


if ( isWatching ) {
  let watchDeps = tasks.map( task => task.name );

  gulp.task('watch', watchDeps, function () {

    // Start browserSync
    browserSync.init({
      server: {
        basedir: './',
      },
    }, () => { browserSync.initialized = true } );

    // Watch files
    for ( let task of tasks ) {
      // watch only for `watchFiles` if any
      if ( !task.watchFiles || (!task.fn && !task.watchFn)) continue;
      let watchFn = [task.name] || task.watchFn;
      task.fn.call();
      gulp.watch(task.watchFiles, [task.name], watchFn);
    }

  });
}