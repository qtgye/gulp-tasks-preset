const path = require('path');
const plumber = require('gulp-plumber');
const print = require(`${__dirname}/print`);


module.exports = (errorMessage = `An error has occured`) => plumber(err => print(errorMessage, 'error', err))
