require('colors');

/**
 * Require packages
 */
const minimist = require('minimist');

/**
 * Require helpers
 */
const {
	projectRoot,
	packageRoot,
  options
} = require('../tools');


/**
 * Define constants
 */
const PACKAGE_ROOT = __dirname;
const PROJECT_ROOT = process.cwd();


/**
 * Initialize modules
 */
const MODULES = {
  task: require(packageRoot('./cli/_task')),
  env: require(packageRoot('./lib/_env')),
};


/** 
 * --------------------------------------------------------------------------------------------
 * PARSE OPTIONS
 * --------------------------------------------------------------------------------------------
 */

// First argument should always be in the `module:method` format
const firstOption = options._[0];
if ( !/[A-Z]:[A-Z]/i.test(firstOption) ) {
  throw new Error(`
    Invalid module call: ${firstOption}`.red + `
    Expected format: ` + `module:method [options...]`.cyan);
}

// Break down into module and method
const [ _module, _method ] = firstOption.split(':');

// Validate module and method 
if ( !(_module in MODULES) ) {
  throw new Error(`
    Module not existing: ${_module}
    Please run help:modules to see a list of available modules
  `.red);
}

if ( !(_method in MODULES[_module]) ) {
  throw new Error(`
    The module ${_module} does not contain a method ${_method}!
  `.red);
}

// Clean up options
options._.splice(0,1);

// Call the method
MODULES[_module][_method](options);
