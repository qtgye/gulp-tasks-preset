/**
 * --------------------------------------------------------------------------------------------
 * TASKS LISTS
 * --------------------------------------------------------------------------------------------
 */

/**
 * List of tasks to run
 * Each task should be the basename of the task's file
 */
let tasks = [
  'vendors',
  'styles',
  'scripts', // Or use 'react' if you're building a react app
  'fonts',
  'images',
];


/**
 * Local/Dev-only tasks
 */
let devOnlyTasks = [
  'lint-styles',
  'lint-scripts',
  'sprites',
];


/**
 * Staging/Prod-only tasks
 */
let prodOnlyTasks = [];




/**
 * --------------------------------------------------------------------------------------------
 * REGISTER GULP TASKS
 * --------------------------------------------------------------------------------------------
 */

let { isLocal, isDevelopment, isStaging, isProduction, registerTasks } = require('gulp-tasks-preset');

tasks = isLocal || isDevelopment ? devOnlyTasks.concat(tasks) : tasks;
tasks = isStaging || isProduction ? prodOnlyTasks.concat(tasks) : tasks;

registerTasks(tasks);
