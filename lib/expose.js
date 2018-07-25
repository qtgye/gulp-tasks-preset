/**
 * Exposes selected API methods
 */

const path = require('path');
const {
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));



/**
 * Exposes the selected methods to the API and CLI
 *
 * @param      {Array}  selectedMethods  The selected methods
 */
function expose (...selectedMethods) {
  return selectedMethods.reduce( (map, method) => {

    try {
      map[method] = require(packageRoot(`lib/${method}`));
    } catch (err) {
      print(`Unable to expose method ${method.bold}:`, err);
    }

    return map;

  }, {});
}


module.exports = expose;
