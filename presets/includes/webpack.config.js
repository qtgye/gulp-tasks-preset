const { env, projectRoot } = require('gulp-tasks-preset');


module.exports = {
  entry: `./src/scripts/app.js`,
  output: {
    path: projectRoot(`dist/scripts`),
    filename: `app.js`,
  },
  module: {
    rules: [
         {
             test: /\.js$/,
             loader: 'babel-loader',
             exclude: /node_modules/,
             query: {
                 "presets": [
                    ["env", { "modules": false }]
                  ],
                  "plugins": [
                    "external-helpers"
                  ]
             }
         }
     ]
  },
  stats: {
    colors: true
  },
  mode: 'development',
  devtool: 'sourcemaps',
};
