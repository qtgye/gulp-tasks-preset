const path = require('path');
const plumber = require('gulp-plumber');
const {print} = require(path.resolve(__dirname, './'));

module.exports = (errorMessage = `An error has occured`) => plumber(err => print(errorMessage, 'error', err));
