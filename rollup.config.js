let { isDevelopment, isLocal, isStaging, isProduction, isWatching,
      projectRoot, browserSync } = require('./gulp');

let fs = require('fs-extra');
let babel = require('rollup-plugin-babel');
let node = require('rollup-plugin-node-resolve');
let isDev = isDevelopment || isLocal ? true : false;
let isProd = isStaging || isProduction ? true : false;

let entry = projectRoot('source/scripts/app.js');

let rollupPlugins = isProd ? [ uglify() ] : [];
rollupPlugins = rollupPlugins.concat([
  babel(),
  node(),
]);

module.exports = {
  input: entry,
  plugins: rollupPlugins,
}