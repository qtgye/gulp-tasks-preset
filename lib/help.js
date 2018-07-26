/**
 * Prints out help doc for CLI commands
 * 
 * Every command that's exposed to the CLI API should be documented here
 */

require('colors');
const path = require('path');

const {
  projectRoot,
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const COMMANDS = {

  'help': {
    syntax: '--help',
    description: `Shows commands documentation.`,
    options: {
      commandName: `The name of the preset command. e.g. ${'--create'.italic}. If given, shows documentation for that specific command.`,
    }
  },


  'create': {
    syntax: '--create',
    description: `Creates a new task file.`,
    options: {
      'taskName': `The name of the task`,
      '--deps task1,task2': `Comma-separated list of task names that will run before the task.`,
      '--require package1,packageName:variableName': `Comma-separated list of node packages to require. You can set the variable name for the package by using the ${'packageName:variableName'.bold} format.`,
      '--watch fileGlobs': `Globs pattern of files to watch for this task. If you will use array syntax, you must wrap it with quotes in order for shell to parse it correctly. e.g., ${`"['src/**/*']"`.bold}.`,
      '--env regex': `Allows a task to be ran only on the matching environment.`,
      '--default': `Adds the task to the default task dependencies.`,
      '--description text': `Sets the task description.`
    }
  },


  'install': {
    syntax: '--install',
    description: `Installs an available preset task into your project. To see a list of available presets, run ${'gulp tasks list'.bold}`,
    options: {
      'task1,task2': `Comma-separated list of preset tasks to install.`,
      '--force': `If a task is already present, this will force to override the file.`,
    }
  },


  'list': {
    syntax: '--list',
    description: `Lists down all the installed and available tasks.`,
  }


};


function help(options) {

  const commandName = (options._[0] && options._[0] in COMMANDS) ? options._[0] : null;

  if ( commandName ) {
    printDetail(commandName);
  } else {
    printList();
  }
  

}


/**
 * Prints out documentation for a command
 *
 * @param      {string}  command  The command
 */
function printDetail(commandName) {
  
  const commandObject = COMMANDS[commandName];

  console.log(` ${commandName} `.bold.black.bgYellow);
  console.log('\nSyntax'.blue.bold);
  console.log(`  ${commandObject.syntax}`);
  for (let _option in commandObject.options ) {
    console.log(`    [${_option}]`);
  }
  console.log('\nDescription'.blue.bold);
  console.log(`  ${commandObject.description}`);

  if ( commandObject.options ) {
    console.log('\nOptions'.blue.bold);
    for (let _option in commandObject.options ) {
      console.log(`  ${_option.bold.magenta.dim}`, `\n  - ${commandObject.options[_option]}`);
    }
  }

  console.log('');

}


/**
 * Prints out a list of available commands
 */
function printList() {
  console.log('');
  for (let commandName of Object.keys(COMMANDS) ) {
    const command = COMMANDS[commandName];
    console.log(` ${commandName.cyan.bold}   \t${command.description}`);
  }
  console.log('');
  console.log(` To see detailed information about a command, run:`);
  console.log(' gulp tasks --help [command]'.bold);
  console.log('');
}


module.exports = help;
