let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('../');

let rollup = require('rollup');
let node = require('rollup-plugin-node-resolve');
let babel = require('rollup-plugin-babel');
let uglify = require('rollup-plugin-uglify');
let notifier = require('node-notifier');

let entry = projectRoot('source/scripts/app.js');
let output = projectRoot('dist/scripts/app.js');
let isDev = isDevelopment || isLocal ? true : false;
let isProd = isStaging || isProduction ? true : false;

let rollupPlugins = isProd ? [ uglify() ] : [];
rollupPlugins = rollupPlugins.concat([
  babel({
    exclude: 'node_modules/**', // only transpile our source code
    runtimeHelpers: true,
    presets: [[
      "env", {
        modules: false,
      }
    ]],
    plugins: [
      'external-helpers',
    ]
  }),
  node(),
]);


module.exports = {

  fn: async function () {

    try {

      const bundle = await rollup.rollup({
        input: entry,
        plugins: rollupPlugins,
      });

      await bundle.write({
        file: output,
        format: 'iife',
        name: 'app_scripts',
        sourcemap: isDev ? true : false,
      });

      notifier.notify({
        'title': 'Gulp',
        'message': 'Scripts Task Finished!',
      });

      if ( isWatching && browserSync.initialized ) {
        browserSync.reload();
      }

    } catch (error) {
      let title = 'Bundle Error!';
      notifier.notify({
        'title': title,
        'message': error.message,
      });
      console.log(title.red);
      console.log(error.message);
      console.log(error.stack.gray);
    }

  },


  deps: isDev ? [ 'lint-scripts' ] : [],


  watchFiles: projectRoot('source/scripts/**/*.js')


}