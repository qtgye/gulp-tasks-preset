const path = require('path');
const PROJECT_ROOT = process.cwd();

/**
 * Creates a full toolPath relative to the package root
 * @param  {String} toolPath - package root descendant toolPath
 * @return {String}
 */
module.exports = function (toolPath = '') {
	return path.resolve(PROJECT_ROOT, toolPath);
}