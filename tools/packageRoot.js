const path = require('path');
const PACKAGE_ROOT = path.resolve(__dirname, '../');

/**
 * Creates a full toolPath relative to the project root
 * @param  {String} toolPath - project root descendant toolPath
 * @return {String}
 */
module.exports = function (toolPath = '') {
	return path.resolve(PACKAGE_ROOT, toolPath);
}