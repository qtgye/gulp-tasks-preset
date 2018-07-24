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

module.exports = (message = '', typeOrData, someData) => {


  // Determine messageColor
  // ------------------------------------------------

  let messageColor = 'white';
  let stopProcess = false;
  let logData = typeOrData;

  // If no data, this must be just a simple log
  if ( !typeOrData ) {
    messageColor = 'white';
  }

  // Check if typeOrData it indicates log type 
  else if ( typeOrData in LOG_TYPES ) {
    messageColor = LOG_TYPES[typeOrData];
    logData = someData;
  }

  // If error
  else if ( typeOrData instanceof Error ) {
    messageColor = 'red';
    stopProcess = true;
    logData = typeOrData.stack.red.dim;
  }


  // Output
  console.log(` ${COLOR_ICONS[messageColor]}   ${message}`[messageColor]);
  if ( logData ) {
    console.log(logData);
  }
  // Output empty space
  console.log('');

  if ( stopProcess ) {
    process.exit();
  }

};
