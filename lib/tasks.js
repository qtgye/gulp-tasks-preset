/**
 * The "tasks" tasks which exposes API methods to the user
 */

const path = require('path');
const {
  packageRoot,
  projectRoot,
  options,
  print,
} = require(path.resolve(__dirname, '../tools'));

const expose = require(packageRoot('lib/expose'));

const PRESET_COMMANDS = ['create', 'install', 'list', 'help'];


module.exports = {

  name: 'tasks',

  task: (done) => {

    // Expose API commands
    const COMMANDS = expose(...PRESET_COMMANDS);

    // Extract command names
    const COMMAND_NAMES = Object.keys(COMMANDS);

    // Defaults to "list" command
    let command = 'list';

    // Parse command from CLI options
    for ( let commandName of COMMAND_NAMES ) {
      if ( commandName in options ) {
        command = commandName;
        break;
      }
    }

    // Validate module and method 
    if ( !(command in COMMANDS) ) {
      print(`Command not existing: ${command.bold}. Please run ${'commands'.bold} to see a list of available modules`, 'error');
      process.exit();
    }

    // Use command value as first unnamed value in minimist-generated options
    options._.push(options[command]);

    // Clean up options
    options._.splice(0,1);

    // Clear the console
    console.clear();

    // Call the method
    COMMANDS[command](options);

    done();
  },

  dontNotify: true,

}
