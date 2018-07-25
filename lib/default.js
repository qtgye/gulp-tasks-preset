/**
 * Handles default task
 */

const {
  packageRoot,
} = require('../tools');

const config = require(packageRoot('lib/config'));
const get = require(packageRoot('lib/get'));


/** @type {Array} will hold registered default tasks */
DEFAULT_TASKS = {};



/**
 * Registers a given task name as a default task dependency
 *
 * @class      Default (name)
 * @param      {string}  taskName  The task name
 */
const Default = (taskName = '') => {
  const gulp = config('gulp');

  const taskObject = get(taskName);

  if ( taskObject ) {
    DEFAULT_TASKS[taskName] = taskObject;
  }

};



/**
 * Returns the default task as a taskObject
 *
 * @return     {object}  
 */
Default.get = () => {

  // Rererence gulp
  const gulp = config('gulp');

  // Get the default task config
  const defaultTaskConfig = config('default');

  // Build deps
  const deps = defaultTaskConfig.deps || [];
  const taskNames = Object.keys(DEFAULT_TASKS);

  // Build default task function
  const defaultTaskFunction = typeof defaultTaskConfig.task === 'function' ? defaultTaskConfig.task : done => done();

  // Append DEFAULT_TASKS to dependencies
  taskNames.forEach( task => {
    if ( !(deps.includes(task)) ) {
      deps.push(task);
    }
  });

  return {
    name: 'default',
    dependencies: deps,
    task: done => defaultTaskFunction(done),
  }

}


/** Export */
module.exports = Default;
