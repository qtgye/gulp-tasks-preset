/** 
 * --------------------------------------------------------------------------------------------
 * Env module
 *
 * Handles stuff for Env
 * --------------------------------------------------------------------------------------------
 */

const path = require('path');
const dotenv = require('dotenv');
const {
	packageRoot,
	projectRoot,
  print,
} = require('../tools');
const ENV = dotenv.config(projectRoot('.env')).parsed;
const APP_ENV = ENV ? ENV.ENV || ENV.APP_ENV : 'PRODUCTION';


/**
 * Gets the value of a given env name
 *
 * @param      {String}   envName  The environment name
 * @return     {Mixed}  The env value, if any
 */
function env ( envName = '') {
  if ( envName ) {
    return ENV ? ENV[envName] : undefined;
  }
  return APP_ENV;
};

/**
 * Checks if app env is equal to the given value
 */
env.is = (envValue = '') => {
  return APP_ENV === envValue;
};


/**
 * Checks if app env is matching a given RegExp
 */
env.matches = (regex = null) => {
  if ( !regex ) {
    return false;
  }

  if ( !(regex instanceof RegExp) ) {
    const error = new Error(`Parameter should be a ${'regular expression'.bold}`);
    print(error.message, error);
  }

  return regex.test(env());
};


/**
 * Gets all the values of the ENV file
 */
env.all = () => {
  return ENV;
};

module.exports = env;
