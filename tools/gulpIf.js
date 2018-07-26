const through = require('through2');

module.exports = (condition, stream1, stream2 = through.obj() ) => {
  return (condition) ? stream1 : stream2
};
