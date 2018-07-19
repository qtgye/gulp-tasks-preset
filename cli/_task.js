/**
 * Handles CLI Task module
 */

const fs = require('fs-extra');
const {
  packageRoot,
  projectRoot,
  template,
} = require('../tools');

module.exports = {


  /**
   * Creates a new task file into the project
   * @param  {options} options - Minimist cleaned up CLI options
   */
  new(options) {
    
    // First unnamed option should be the name of the task
    const name = options._[0];
    
    // List of other gulp task names to run before the task
    const dependencies = options.dependencies ? options.dependencies.split(',') : null;

    // List of node modules to require
    const _require = options.require ? options.require.split(',') : null;

    // Validate dependencies
    if ( dependencies ) {
      dependencies.map(this.validate);
    }

    // Validate required modules
    if ( _require ) {
      _require.map( _module => {
        if ( !require.cache[require.resolve(_module)] ) {
          console.log(`The module ${_module.cyan} is not yet installed. Considering installing it.`.yellow);
        }
      });
    }

    // Generate task file
    const taskFileContent = template('task', { name, dependencies, require: _require });

    console.log('taskFileContent',taskFileContent);

  },


  validate(taskName = '') {

    if ( !taskName ) { return; }

    const taskFilePath = projectRoot(`gulp/${taskName}.js`);

    if ( !fs.existsSync(taskFilePath) ) {
      console.log(`There is no task named ${taskName.cyan}. Considering creating it.`.yellow);
    }

  }
}
