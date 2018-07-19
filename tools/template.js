/**
 * This handles templating 
 * All templates should be placed in the templates folder
 */

/** 
 * Import packages and tools
 */
const fs = require('fs-extra');
const path = require('path');
const Twig = require('twig');
const PACKAGE_ROOT = path.resolve(__dirname, '../templates');

/** 
 * Export
 * @param {String} templateFile  - The template filename. Any extension will be stripped out
 * @param {Object} data - Data to pass into the template
 */
module.exports = function (templateFile = '', data = {} ) {
  const templatePath = path.resolve(PACKAGE_ROOT, templateFile.replace('/\.*$/','') + '.twig') 
  const templateContent = fs.readFileSync(templatePath).toString();
  return Twig.twig({data: templateContent}).render(data);
}
