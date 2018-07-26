const path = require('path');
const {
  packageRoot,
} = tools = require(path.resolve(__dirname, 'tools'));

const expose = require(packageRoot('lib/expose'));


/**
 * Select only methods to expose into the API
 */
_exports = expose('env', 'load', 'config', 'init');

/**
 * Select only tools to expose
 */
[ 
  'print',
  'projectRoot',
  'gulpIf',
  'onStreamError'
].map( toolName => _exports[toolName] = tools[toolName] );

/**
 * Export
 */
module.exports = _exports;
