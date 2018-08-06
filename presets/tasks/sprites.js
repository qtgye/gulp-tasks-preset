let svgSprite = require('gulp-svg-sprite');
let imagemin = require('gulp-imagemin');
let through = require('through2');
let gulp = require('gulp');

let src = 'src/icons/**/*.svg';
let dest = 'dist/images';

module.exports = {

  name: 'sprites',

  task: () => {
    return gulp.src(src)
            .pipe(imagemin())
            .pipe(svgSprite({
              mode: {
                symbol: true,
              },
              preview: false,
            }))
            // Ensure that the output file will not have the extra 'symbol/svg/' folder tree made by the svg-sprite plugin
            .pipe(through.obj(function (file, enc, next) {
              file.path = file.path.replace('symbol/svg/', '');
              this.push(file);
              next();
            }))
            .pipe(gulp.dest(dest));
  },


  watch: src,


}
