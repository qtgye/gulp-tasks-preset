/** 
 * --------------------------------------------------------------------------------------------
 * Creates a new task
 * --------------------------------------------------------------------------------------------
 */
const fs = require('fs-extra');
const {walkFilesSync} = require('fs-walk');
const {
  packageRoot,
  projectRoot,
  template,
  print,
} = require('../tools');


/**
 * Creates a new task file into the project
 * @param      {Object}  options  - Minimist cleaned up CLI options
 */
function create (options) {
  
  // First unnamed option should be the name of the task
  const name = options._[0];
  
  // List of other gulp task names to run before the task
  const dependencies = options.dependencies ? options.dependencies.split(',') : null;

  // List of node modules to require
  let _require = options.require ? options.require.split(',') : null;

  // Validates for new task
  validateNew(name);

  // Validate dependencies
  if ( dependencies ) {
    dependencies.map(validateExisting);
  }

  if ( _require ) {

    // Parse required modules for name mapping
    // i.e. allows `browser-sync:browserSync` to output `const browserSync = require('browser-sync')`
    _require = _require.map( _module => {
      // Transform into _module info object
      const members = _module.split(':');
      const _package = {
        name: members[0],
        variable: members[1] || members[0].replace(/\-/,'_'), // If not in format `name:variable`, transform the name by default
      }
      // Check if module is already installed
      if ( !require.cache[require.resolve(_package.name)] ) {
        print(`The module ${_package.name.bold} is not yet installed. Consider installing it.`, 'warning');
      }
      return _package;

    });
  }

  // Generate task file
  const taskFileContent = template('task', { name, dependencies, require: _require });
  try {
    fs.outputFileSync(projectRoot(`gulp/${name}.js`), taskFileContent);
  } catch (err) {
    print(`Unable to create a new file for ${name.bold} task.`, err);
  }

  print(`Task ${name.bold} has been created!`, 'success');
}




/**
 * Validates a new task to be created
 *
 * @param      {string}  taskName  The task name
 * @param      {string}  fileName  The file name
 */
function validateNew(taskName = '', fileName = '') {

  // Require name
  if ( !taskName ) {
    print(`Please provide a name for the new task!`, new Error());
  }

  // Validate name format
  if ( /[^a-z0-9_-]/ig.test(taskName) ) {
    print(`Please provide a valid task name! Should only match /[a-z0-9_-]+/i`, new Error());
  }

  // Validate existing
  if ( fs.existsSync(projectRoot(`gulp/${taskName}.js`)) ) {
    print(`Task ${taskName.bold} is already present! Please update it or choose a different name.`, new Error());
  }

}




/**
 * Checks if a task is present
 *
 * @param      {String}  taskName  The task name
 */
function validateExisting(taskName = '') {

  if ( !taskName ) { return; }

  const taskFilePath = projectRoot(`gulp/${taskName}.js`);

  if ( !fs.existsSync(taskFilePath) ) {
    print(`There is no task named ${taskName.bold}. Consider creating it.`, 'warning');
  }

}


module.exports = create;
