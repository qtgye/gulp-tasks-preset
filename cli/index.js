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
const COMMANDS = expose('create', 'install', 'list');


/** 
 * --------------------------------------------------------------------------------------------
 * PARSE OPTIONS
 * --------------------------------------------------------------------------------------------
 */

// First argument should always be the command
// If not given, use the "list" command by default
// [TO DO]: Use a "help" default command
const command = options._ && options._.length ? options._[0] : 'list';

// Validate module and method 
if ( !(command in COMMANDS) ) {
  print(`Command not existing: ${command.bold}. Please run ${'commands'.bold} to see a list of available modules`, 'error');
  process.exit();
}

// Clean up options
options._.splice(0,1);

// Call the method
COMMANDS[command](options);
