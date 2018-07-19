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
} = require('../tools');
const ENV = dotenv.config(projectRoot('.env')).parsed;
const APP_ENV = ENV ? ENV.ENV || ENV.APP_ENV : 'PRODUCTION';

module.exports = {
	

	/**
	 * Checks if env is matching the given value
	 */
	is( envValue ) {
		return APP_ENV === envValue;
	},


	/**
	 * Gets all the values of the ENV file
	 */
	all() {
		return ENV;
	}

}
