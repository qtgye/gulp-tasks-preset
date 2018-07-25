/**
 * Runs a task asynchronuously as  Promise
 */

const path = require('path');
const notifier = require('node-notifier');

const {
  packageRoot,
  print,
} = require(path.resolve(__dirname, '../tools'));

const env = require(packageRoot('lib/env'));
const config = require(packageRoot('lib/config'));
const get = require(packageRoot('lib/get'));



/**
 * Runs a given task name
 *
 * @param      {string}   taskName  The task name
 * @return     {Promise}
 */
const runTask =  (taskName = '') => {
  return new Promise((resolve, reject) => {

    var taskObject = get(taskName);

    if ( !taskObject ) {
      return resolve();
    }

    runTask.fromObject(taskObject)
    .then(resolve)
    .catch(reject);

  });
}



/**
 * Runs a given task object
 *
 * @param      {object}  taskObject  The task object
 *                                   Expected format:
 *                                   {
 *                                     name: 'The task name',
 *                                     task: () => {}, // The task function
 *                                     description: 'Task description', {optional}
 *                                     deps: [], // list of task dependencies {optional}
 *                                     default: false, // Is default task {optional}
 *                                     watch: '', // Files to watch {optional}
 *                                   }
 * @return     {Promise}  { description_of_the_return_value }
 */
runTask.fromObject = (taskObject = {}) => {

  const gulp = config('gulp');
  const deps = Array.isArray(taskObject.dependencies) ? taskObject.dependencies : [];

  return new Promise((resolve, reject) => {

    // Ensure required name
    if ( !taskObject.name ) {
      print(`Unable to run a task object. Requires a name property.`, 'error');
      return resolve();
    }

    Promise.all(runDeps(deps))
      .then(() => { 

        // Will hold resolved/rejected flag,
        // Since a task can be resolved through stream's 'end' event,
        // or through 'done' callback
        let finalized = false;

        if ( !taskObject.dontNotify ) {
          print(`Running ${taskObject.name.bold} task`, 'success');
        }

        // Reference to DestroyableTransform class for gulp streams
        const DestroyableTransform = gulp.src('').__proto__.constructor;

        // Run the task function, saving the output
        const taskOutput = taskObject.task(() => {

          // If task function does not return a gulp stream,
          // "done" callback should be called within that function
          if (!finalized) {
            finalized = true;
            logFinished(taskObject);
            resolve();
          }

        });

        // If output is gulp stream
        if ( taskOutput instanceof DestroyableTransform ) {
          taskOutput.on('error', (err) => {
            finalized = true;
            logFinished(taskObject, err);
            resolve();
          });
          taskOutput.on('end', () => {
            finalized = true;
            logFinished(taskObject);
            resolve();
          });
        }

      })
      .catch(err => {
        logFinished(taskObject, err);
        resolve();
      });
  });
}


// Logs a finished task
function logFinished({name, dontNotify}, error) {

  if ( dontNotify ) { return; }

  if (!error) {
    print(`Finished ${name.bold} task`, 'success');
    notifier.notify({
      title: `Finished ${name} task`,
      message: '🎉 🎉 🎉'
    });
  } else if ( error instanceof Error ) {
    print(`Finished ${name.bold} task with error`, 'error', error);
    notifier.notify({
      title: `Finished ${name} task with error`,
      message: `⚠️ ${error.message}`
    });
  }

}



// Returns an array of promises
const runDeps = (deps = []) => {
  return deps.map( taskName => runTask(taskName));
}



module.exports = runTask;
