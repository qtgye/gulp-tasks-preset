/**
 * Sets a default task for gulp
 */

const {
  packageRoot,
} = require('../tools');
const config = require(packageRoot('lib/config'));

module.exports = (...arguments) => {
  const gulp = config('gulp');
  gulp.task.apply(gulp, ['default', ...Array.from(arguments)]);
};
