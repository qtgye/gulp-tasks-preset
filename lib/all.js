/**
  * Returns a list of all the task objects
  */

const path = require('path');
const gulp = require('gulp');
const {filesSync} = require('fs-walk');

const {
  projectRoot,
  packageRoot,
} = require(path.resolve(__dirname, '../tools'));

const config = require(packageRoot('lib/config'));

module.exports = () => {

  const tasksDir = config('tasksDir');
  const tasks = [];

  filesSync(projectRoot(tasksDir), (basedir, filename, stat) => {

    // Get task object
    const taskPath = projectRoot(`${tasksDir}/${filename}`);
    const _taskObject = require(taskPath);

    // Append the full path of the task file
    _taskObject.path = taskPath;

    tasks.push(_taskObject);
  });

  return tasks;

}
