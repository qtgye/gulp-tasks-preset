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
  
  // [OPTION] First unnamed option should be the name of the task
  const name = options._[0];
  
  // [OPTION: --deps ] List of other gulp task names to run before the task
  const dependencies = options.deps ? options.deps.split(',') : null;

  // [OPTION: --require] List of node modules to require
  let _require = options.require ? options.require.split(',') : null;

  // [OPTION: --default] Whether to include this task as default task's dependency
  let _default = options.default ? true : false;

  // [OPTION: --watch] Files to watch
  let watch = options.watch ? options.watch : null;

  // [OPTION: --env] Env pattern to match
  let env = options.env ? options.env : null;

  // [OPTION: --description] Task decription
  let description = options.description ? options.description : null;

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
      try {
        require(_package.name);
        return _package;
      } catch (err) {
        print(`Unable to require ${_package.name.bold}. It is either uninstalled or having errors.`, 'warning');
      }
    });
  }

  // Generate task file
  const taskFileContent = template('task', { name, dependencies, watch, env, description, require: _require, default: _default });
  try {
    fs.outputFileSync(projectRoot(`gulp/${name}.js`), taskFileContent);
  } catch (err) {
    print(`Unable to create a new file for ${name.bold} task.`, err);
  }

  print(`Task ${(name + '').bold} has been created!`, 'success');
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
