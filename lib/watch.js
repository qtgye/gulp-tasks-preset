/**
 * Handles watch task
 */

const path = require('path');
const watch = require('gulp-watch');

const {
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const config = require(packageRoot('lib/config'));
const run = require(packageRoot('lib/run'));

// List of watchers
// Item format:
// {
//    files: {Globs}
//    dependencies: {Array}   // List of dependency tasks
//    function: {Function}    // Function to run
// }
const WATCHERS = [];


/**
   * Registers a watch task
   *
   * @class      Watch (name)
   * @param      {string}  globs            The globs
   * @param      {Array}   arrayOrFunction  List of dependency tasks
   *             {Function}                    The function to run
   * @param      {<type>}  function         The function
   */ 
const Watch = function (globs, arrayOrFunction, _function) {

  let watcher = {
    files: globs,
    dependencies: [],
  };

  if ( Array.isArray(arrayOrFunction) ) {
    watcher.dependencies = arrayOrFunction;
  }

  if ( typeof arrayOrFunction === 'function' ) {
    watcher.fn = arrayOrFunction;
  }
  else if (typeof _function === 'function') {
    watcher.fn = _function;
  }

  WATCHERS.push(watcher);

}


// Static properties and methods
// ------------------------------------------------


// Returns the watch taskObject
Watch.get = () => {

  const watchParams = config('watch') || {};

  let deps = Array.isArray(watchParams.deps) ? watchParams.deps : [];
  let beforeWatch;
  let afterWatch;

  // Get beforeWatch function if any
  if ( typeof watchParams.before === 'function' ) {
    beforeWatch = watchParams.before;
  }

  // Get afterWatch function if any
  if ( typeof watchParams.after === 'function' ) {
    afterWatch = watchParams.after;
  }

  return {
    name: 'watch',
    dependencies: deps,
    task: _done => {
      
      // Call beforeWatch if there is any
      if ( beforeWatch ) {
        beforeWatch();
      }

      // Load all watchers
      for ( let {files = '', dependencies} of WATCHERS ) {
        watch(files, () => dependencies.map( taskName => run(taskName)));
      }

      // Call afterWatch if there is any
      if ( afterWatch ) {
        afterWatch();
      }

      _done();

    }
  }


}



// Export
module.exports = Watch;
