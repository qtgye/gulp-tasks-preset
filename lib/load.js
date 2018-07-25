const path = require('path');
const {walkFilesSync} = require('fs-walk');

const {
  projectRoot,
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const env = require(packageRoot('lib/env'));
const run = require(packageRoot('lib/run'));
const config = require(packageRoot('lib/config'));
const watch = require(packageRoot('lib/watch'));
const _default = require(packageRoot('lib/default'));

// const all = require(packageRoot('lib/all'));
const get = require(packageRoot('lib/get'));

/**
 * Loads all tasks given
 *
 * @param      {Arguments}  taskNames  The task names
 */
module.exports = ( ...taskNames ) => {

  const gulp = config('gulp'); // This makes sure that we pick up user-provided gulp from config
  const DestroyableTransform = gulp.src('*').__proto__.constructor; // Reference for DestroyableTransform gulp stream prototype

  // Load given task names
  taskNames.forEach( taskName => {

    const taskObject = get(taskName);

    if ( !taskObject ) { return; }

    // Verify if task has a task function
    if ( !('task' in taskObject)) {
      return print(`The task ${taskObject.name.bold} has no callable ${'task'.bold} function. Please update the task file.`, 'warning');
    }

    // Register to gulp
    gulp.task(taskObject.name, done => {
      run(taskName).then(done);
    });

    // Check if this task will watch
    if ( taskObject.watch ) {
      watch(taskObject.watch, [taskName]);
    }

    // Check if this task will be included in the default task dependencies
    if ( taskObject.default ) {
      _default(taskObject.name);
    }

  });

  // Load default
  gulp.task('default', done => {
    run.fromObject(_default.get()).then(done);
  });

  // Load watch
  gulp.task('watch', done => {
    run.fromObject(watch.get()).then(done);
  });

  print(`Tasks loaded. Starting tasks...`, 'success');

};


