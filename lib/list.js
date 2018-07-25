/**
 * Handles listing of available task presets and existing projects tasks
 */

const {filesSync} = require('fs-walk');
const path = require('path');
const {
  projectRoot,
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const config = require(packageRoot('lib/config'));

module.exports = () => {

  // Get list of installed tasks
  let tasksDirPath = projectRoot(config('tasksDir'));
  let installed = [];
  filesSync(tasksDirPath, (basedir, filename, stat) => {
    installed.push(filename.replace(/\..*$/, ''));
  });

  // Get list of installable task presets
  let presets = Object.keys(require(packageRoot('presets/presets.js')));

  // Filter presets to exclude already existing ones
  presets = presets.filter( taskName => !installed.includes(taskName) );

  // List down installed tasks
  print(`Installed tasks:`, `info`, installed.map( name => `     - ${name.cyan}`).join('\n'));

  // List down available preset tasks
  print(`Available task presets:`, `info`, presets.map( name => `     - ${name.cyan}`).join('\n'));

}
