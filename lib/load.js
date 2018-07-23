const path = require('path');
const {walkFilesSync} = require('fs-walk');

const {
  projectRoot,
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const env = require(packageRoot('lib/env'));
const all = require(packageRoot('lib/all'));
const config = require(packageRoot('lib/config'));

/**
 * Loads all tasks given
 *
 * @param      {Arguments}  taskNames  The task names
 */
module.exports = ( ...taskNames ) => {

  print(`Loading tasks...`, 'info');

  const gulp = config('gulp'); // This makes sure that we pick up user-provided gulp from config
  const availableTasks = all();

  // Map tasks according to their names
  const taskskMap = availableTasks.reduce( (map, taskObject) => {
    map[taskObject.name] = taskObject;
    return map;
  }, {});

  // Load given task names
  taskNames.forEach( taskName => {

    // Verify if task is existing
    if ( !(taskName in taskskMap) ) {
      return print(`There is no task named ${taskName.bold}. Consider creating it.`, 'warning');
    }

    const taskObject = taskskMap[taskName];

    // Verify if task has a task function
    if ( !('task' in taskObject)) {
      return print(`The task ${taskObject.name.bold} has no callable ${'task'.bold} function. Please update the task file.`, 'warning');
    }

    // Register to gulp
    gulp.task(taskObject.name, function (done) {
      
      // Check if task requires environment
      if ( !taskIsAllowed(taskObject) ) {
        print(`Skipping task ${taskName.bold}, not allowed in this environment.`, 'info');
        done();
      }

      return taskObject.task(done);

    });

  });

  print(`Done loading tasks!`, 'success');

};



// Helper functions
// ------------------------------------------------

/**
 * Checkf if a task is allowed to run in the current environment
 *
 * @param      {object}  taskObject  The task object
 */
function taskIsAllowed(taskObject = {}) {
  
  if ( !taskObject || !taskObject.env ) {
    return true;
  }

  if ( typeof taskObject.env === RegExp ) {
    return taskObject.env.test(env());
  }

  return taskObject.env === env();

}
