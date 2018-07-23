/**
 * Require helpers
 */
const {
	projectRoot,
	packageRoot,
  options,
  print,
} = require('../tools');
const expose = require(packageRoot('lib/expose'));

/**
 * Exposed CLI API methods
 */
const COMMANDS = expose('create');


/** 
 * --------------------------------------------------------------------------------------------
 * PARSE OPTIONS
 * --------------------------------------------------------------------------------------------
 */

// First argument should always be in the `module:method` format
const firstOption = options._[0];

// Break down into module and method
const [ _module, _method ] = firstOption.split(':');

// Validate module and method 
if ( !(_module in COMMANDS) ) {
  print(`Command not existing: ${_module.bold}. Please run ${'commands'.bold} to see a list of available modules`, 'error');
  process.exit();
}

// Clean up options
options._.splice(0,1);

// Call the method
COMMANDS[_module](options);
