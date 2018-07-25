const path = require('path');
const {
  packageRoot,
} = require(path.resolve(__dirname, 'tools'));

const expose = require(packageRoot('lib/expose'));


/**
 * Select only methods to expose into the API
 */
module.exports = expose('env', 'load', 'config', 'init');
