/**
 * Handles getting a task object from its file
 */

const path = require('path');
const {existsSync} = require('fs-extra');
const {
  packageRoot,
  projectRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const config = require(packageRoot('lib/config'));
const env = require(packageRoot('lib/env'));
const tasksDir = config('tasksDir');




/**
 * Gets the taskObject of a given taskName from its file
 *
 * @class      Get (name)
 * @param      {string}  taskName  The task name
 * @return     {object}  The task object
 */
const Get = (taskName = '') => {

  if ( !taskName ) {
    return null;
  }

  const taskFilePath = projectRoot(`${tasksDir}/${taskName}.js`);

  if ( !existsSync(taskFilePath) ) {
    print(`Unable to get task ${taskName}. File is missing.`, 'error');
    return null;
  }

  try {
    let taskObject = require(taskFilePath);

    if ( !taskIsAllowed(taskObject) ) {
      return null;
    }

    // Append the full path of the task file
    taskObject.path = taskFilePath;

    // Return object
    return taskObject;

  } catch (err) {
    print(`Unable to get task ${taskName.bold} due to an error:`, err);
  }


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

module.exports = Get;
