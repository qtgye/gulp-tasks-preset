# Gulp Tasks Preset

A set of gulp workflows I commonly use in projects

---

## Table of Contents:
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Gulpfile](#gulpfile)
  - [Tasks Included](#tasks-included)
      - [lint-styles](#lint-styles)
      - [lint-scripts](#lint-scripts)
      - [scripts](#scripts)
      - [styles](#styles)
      - [vendors](#vendors)
      - [Default and Watch](#default-and-watch)
  - [Creating New Tasks](#creating-new-tasks)
  - [Environment Aware](#environment-aware)


---

## Installation
The preset requires node version at least **7.10.1**.  

- Install the package through **npm**, `npm install --save-dev gulp-tasks-preset gulp`. We include **gulp** since it needs to be installed locally as well.
- Install the preset files by running the executable, `./node_modules/.bin/gulp-tasks-preset`. This will prompt you to replace an existing gulpfile, if there is any.

> You only need to install the preset files once during fresh setup. Reinstalling them again would result to your updated tasks files to be overriden with the default.



---

## Environment Setup
A `.env` file is required for the gulp tasks to run and select tasks according to the environment.
This expects a `ENV` variable, which can be `LOCAL`, `DEVELOPMENT`, `STAGING`, or`PRODUCTION`.


---

## Gulpfile
The gulpfile will only contain a way to register your desired tasks. Provided are 3 lists of tasks:
- **tasks** - Tasks that you expect to run on all environments
- **devOnlyTasks** - Tasks that you expect to run only on LOCAL or DEVELOPMENT environments
- **prodOnlyTasks** - Tasks that you expect to run only on STAGING or PRODUCTION environments


---

## Tasks included
- [lint-styles](#lint-styles)
- [lint-scripts](#lint-scripts)
- [scripts](#scripts)
- [styles](#styles)
- [vendors](#vendors)
- [Default and Watch](#default-and-watch)


### Lint Styles
Uses [gulp-sass-lint](https://github.com/sasstools/gulp-sass-lint) as SASS linter.  
A default `.sass-lint.yml` file has been provided. For details about the config, please see 


### Lint Scripts
Uses [gulp-jshint](https://github.com/spalger/gulp-jshint).  
A default `.jshintrc` file has been provided. It's default **esversion** setting is 6, due to es8(or next) still under the works on JSHint's end.


### Scripts
Uses [Rollup](https://rollupjs.org) to bundle es6 modules, and [Babel](https://babeljs.io/) to transpile ES versions. Default config files `rollup.config.js` and `.babelrc` has been provided.  

By default, babel is using the **env** in order to support the latest ES versions.
However, if your current project requires more of the latest ES version, you would have to configure babel to support them (such as installing transform plugins, etc.).
This is just a barebones to get you started on a project utilising modules and es2015+.


### Styles
Uses [SASS](http://sass-lang.com/) precompiler.


### Vendors
Simply concatenates vendors scripts and stylesheets.  

A config file `vendors.config.js` has been provided to manage lists of vendor files.
When running in `watch`, any change in the config file triggers the task to run.
This allow you to add and remove vendor files without having to restart gulp over and over. 


### Default and Watch
Default task will automatically run all the registered tasks in your gulpfile.  
Watch task will only be registered if you run `gulp watch`.

The watch task is in its own file, so you have the freedom to customize/override it (e.g., if you want to use proxy for the browserSync, etc.).



---

## Creating New Tasks
Every task should be on its own file inside `gulp/tasks` folder. You may use `_sampleTask.js` as a stub for your new task.  
The task's filename will be used as the gulp task's name. So a `copy-files` task should be in `copy-files.js` task.  
> The existing tasks are designed to be [environment-aware](#environment-aware). It is recommended that you design new tasks in such way too.


---

## Environment Aware
The preset leverages the use of environment variables accross all tasks and configurations in order to efficiently select stuff that will be used only on a specific environment. Some of these features are:
- **Local/Development**
  - Assets are not minified
  - Sourcemaps are included
  - Linter tasks are available
  - Watch task is available
- **Staging/Production**
  - Assets are minified
  - CSS media queries are combined
  - No sourcemaps  

All the environment variables and other helpers are available when you require the `gulp` directory. These are helpful when you build your own tasks.
