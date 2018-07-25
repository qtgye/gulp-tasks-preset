/**
 * Handles installation of preset tasks
 */

const gulp = require('gulp'); // We don't need exact project's gulp for this instance
const path = require('path');
const {existsSync, readFileSync} = require('fs-extra');
const {filesSync} = require('fs-walk');
const {
  packageRoot,
  projectRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const config = require(packageRoot('lib/config'));
const availablePresets = getAvailablePresets();

/**
 * Installs an existing task preset file
 *
 * @class      Install (name)
 * @param      {object}  options  The CLI options
 */
function Install (options = {}) {

  const taskName = options && options._ ? options._[0] : null;

  if ( !taskName ) {
    return print(`Please provide a task name.`, 'error');
  }
  
  // Check if task file exists
  if ( !(taskName in availablePresets) ) {
    let taskNames = Object.keys(availablePresets).map( name => `     - ${name.cyan}` ).join('\n');
    return print(`There is no ${taskName.bold} task from the available presets. List of available tasks:\n`,'error', taskNames);
  }

  
  const taskFilePath = packageRoot(`presets/tasks/${availablePresets[taskName].file}`);

  // Check if already existing
  if ( existsSync(projectRoot(`${config('tasksDir')}/${taskName}.js`)) && !(options.force) ) {
    return print(`Task ${taskName.bold} is already present. You may override it by using ${'--force'.bold} option`,'error');
  }

  const taskFileIncludes = availablePresets[taskName].includes
                           ? availablePresets[taskName].includes.map( includeFile => packageRoot(`presets/includes/${includeFile}`) )
                           : [];
  const pathsToCopy = [taskFilePath, ...taskFileIncludes];

  try {

    // Copy task file
    const targetTasksDir = projectRoot(config('tasksDir'));
    gulp
      .src(taskFilePath)
      .on('error', err => {throw err})
      .pipe(gulp.dest(targetTasksDir));

    // Copy includes
    gulp
      .src(pathsToCopy)
      .on('error', err => {throw err})
      .pipe(gulp.dest(projectRoot()));

    print(`Successfully installed ${taskName.bold}!`, `success`);

  } catch (err) {
    print(`There was an error while trying to intall ${taskName.bold} task:`, `error`, err);
  }

}



/**
 * Gets the available presets.
 */
function getAvailablePresets() {
  
  const presets = require(packageRoot('presets/presets.js'));

  return presets;

}





// Export
// ------------------------------------------------

module.exports = Install;