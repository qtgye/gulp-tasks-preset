let gulp = require('gulp');
let concat = require('gulp-concat');
let configFile = 'vendors.config.js';
let dest = {
  styles: 'dist/styles',
  scripts: 'dist/scripts',
};


module.exports = {


  name: 'vendors',


  description: 'Compiles vendors scripts and styles',


  task: done => {
    try {
      // Remove cached vendor file as node module
      delete require.cache[configFile];

      // Get vendors list
      let vendors = require(configFile);
      let _done = 0;

      // Compile Vendor Scripts
      gulp.src(vendors.scripts)
          .pipe(concat('vendors.js'))
          .pipe(gulp.dest(dest.scripts).on('end', () => ++_done === 2 ? done() : null));

      // Compile Vendor Styles
      gulp.src(vendors.styles)
          .pipe(concat('vendors.css'))
          .pipe(gulp.dest(dest.styles).on('end', () => ++_done === 2 ? done() : null));

    } catch(err) {
      console.log(err);
    }
  },


  watch: configFile,


};
