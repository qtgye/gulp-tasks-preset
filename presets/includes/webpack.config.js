let { projectRoot } = require('gulp-tasks-preset');

let src = projectRoot('src/app.js');

module.exports = {
  entry: [ 'babel-polyfill', src ],
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ]
  }
}