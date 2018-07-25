/**
 * Exposes selected API methods
 */

const path = require('path');
const {
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));


// Will hold exposed methods
const EXPOSED_METHODS = {};



/**
 * Exposes the selected methods to the API and CLI
 *
 * @param      {Array}  selectedMethods  The selected methods
 */
function expose (...selectedMethods) {
  selectedMethods.map( (method) => {

    try {
      EXPOSED_METHODS[method] = require(packageRoot(`lib/${method}`));
    } catch (err) {
      print(`Unable to expose method ${method.bold}:`, err);
    }

  });

  return EXPOSED_METHODS;
}


module.exports = expose;
