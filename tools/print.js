require('colors');

const LOG_TYPES = {
  'info'    : 'magenta',
  'warning' : 'yellow',
  'error'   : 'red',
  'success' : 'green',
};

const COLOR_ICONS = {
  'white'   : '-',
  'green'   : '✔',
  'yellow'  : '⚠',
  'magenta' : 'ⓘ',
  'red'     : '✘',
};

module.exports = (message = '', someData) => {


  // Determine messageColor
  // ------------------------------------------------

  let messageColor = 'white';
  let stopProcess = false;

  // If no data, this must be just a simple log
  if ( !someData ) {
    messageColor = 'white';
  }

  // Check if someData it indicates log type 
  else if ( someData in LOG_TYPES ) {
    messageColor = LOG_TYPES[someData];
    someData = null;
  }

  // If error
  else if ( someData instanceof Error ) {
    someData = someData.stack.red.dim;
    messageColor = 'red';
    stopProcess = true;
  }


  // Output
  console.log(` ${COLOR_ICONS[messageColor]}   ${message}`[messageColor]);
  if ( someData ) {
    console.log(someData);
  }
  // Output empty space
  console.log('');

  if ( stopProcess ) {
    process.exit();
  }

};
