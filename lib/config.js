/**
 * Sets/Gets configuration options for the Gulp Tasks Preset API
 */

/** @type {Object} Configuration map, preloaded with defaults */
const CONFIG = {

  /** directory where gulp task files will reside, relative to the project root */
  'tasksDir' : 'gulp',

  /** The gulp module to use for the tasks.
   * This is useful in case the project gulp is different from the gulp-tasks-preset gulp,
   * Which is unlikely to happen in a normal project setup. */
  gulp: require('gulp'),

  /**
   * Watch task params.
   * 
   * format expected when given:
   * {
   *   deps: {Array}
   *   before: {Function}
   *   after: {Function}
   * }
   */
  watch: null,

  /**
   * Default task params
   * 
   * format expected when givien:
   * {
   *   deps: {Array},
   *   task: {Function}
   * }
   */
  default: null,

};


/**
 * @param      {string} If second parameter is given, will set the config name with the given value
 *             {object} Will set each objec key as config name with its respective value
 */
const Config = function (mapOrString = '', setValue = '') {
  
  // Check if only getting a value
  if ( typeof mapOrString === 'string' && !setValue ) {
    return CONFIG[mapOrString];
  }

  // Check if object map of config set values
  if ( typeof mapOrString === 'object' ) {
    for ( let key in mapOrString ) {
      if ( key in CONFIG ) {
        CONFIG[key] = sanitizeConfigValue(key, mapOrString[key]);
      }
    }
  }
  else if (typeof mapOrString === 'string') {
    if ( mapOrString in CONFIG ) {
      CONFIG[mapOrString] = sanitizeConfigValue(mapOrString, setValue);
    }
  }

};


// Add static properties/methods
// ------------------------------------------------
Config.all = function () {
  return CONFIG;
};


// Helper functions
// ------------------------------------------------

// Ensures that config values are in proper format
sanitizeConfigValue = (configKey, configValue = '') => {

  switch (configKey) {
    case 'tasksDir': return configValue.replace(/(^\/*|\/*$)/g, '');
    default: return configValue;
  }

}


/**
 * Export
 */
module.exports = Config;
