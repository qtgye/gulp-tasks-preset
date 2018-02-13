require('colors');
let fs = require('fs-extra');
let readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const APP_ROOT = __dirname;
const PRESET_ROOT = `${APP_ROOT}/preset`;
const PRESET_GULPFILE_PATH = `${PRESET_ROOT}/gulpfile.js`;

const PROJECT_ROOT = process.cwd();

proceedInstall()
.then(process.exit);



/**
 * --------------------------------------------------------------------------------------------
 * HELPERS
 * --------------------------------------------------------------------------------------------
 */


async function proceedInstall() {
  let projectGulpfile = `${PROJECT_ROOT}/gulpfile.js`;
  let willInstall = true;

  if ( fs.existsSync(projectGulpfile) ) {
    let willOverride;
    while ( !(/^[yn]$/i.test(willOverride)) ) {
      willOverride = await promptUser('A gulpfile is already present. Do you want to override it with the preset? [y/N] '.yellow);
      willOverride = !willOverride ? 'n' : willOverride;
    }
    willInstall = /y/i.test(willOverride) ? true : false;
  }

  if ( willInstall ) await copyFiles();
  return Promise.resolve();

}


async function promptUser ( question = '' ) {
  return new Promise((resolve, reject) => {

    try {
      readline.question(question, answer => {
        readline.close();
        resolve(answer);
      });
    } catch (err) {
      reject(err);
    }

  });
}


async function copyFiles () {
  return new Promise((resolve, reject) => {

    try {
      let message = '';
      fs.copySync( PRESET_ROOT, PROJECT_ROOT, {overwrite : true} );

      message +=   'Successfuly copied files:\n'.bgGreen.black;
      message += [ '  - .babelrc',
                   '  - .jshintrc',
                   '  - .sass-lint.yml',
                   '  - rollup.config.js',
                   '  - vendors.config.js',
                   '  - gulpfile.js',
                   '  - gulp/',
                   '    - _sampleTask.js',
                   '    - lint-scripts.js',
                   '    - lint-styles.js',
                   '    - scripts.js',
                   '    - styles.js',
                   '    - images.js',
                   '    - sprites.js',
                   '    - fonts.js',
                   '    - vendors.js',
                 ].join('\n').bgBlack.green;

      console.log('\n' + message + '\n');
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}