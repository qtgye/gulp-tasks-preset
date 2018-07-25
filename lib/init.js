/**
 * Initializes the API using all the defaults
 */

const path = require('path');
const {
  packageRoot,
  projectRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const config = require(packageRoot('lib/config'));
const load = require(packageRoot('lib/load'));

module.exports = (userConfig = {}, taskNames = [] ) => {

  // Setup config
  config( typeof userConfig === 'object' ? userConfig : {} );

  // Load tasks
  let selectedTasks = (Array.isArray(taskNames) && taskNames.length) ? taskNames : [];
  load(...selectedTasks);

}
