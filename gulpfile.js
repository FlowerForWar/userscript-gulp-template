/**
 * This file will not be watched.
 * If you make changes to it, you will have to terminate and
 * start the package again.
 */

const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');

const newFile = require('gulp-file');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const flatten = require('gulp-flatten');
const modifyContent = require('gulp-modifier');
const { prependFile } = require('gulp-append-prepend-no-trim');
const { stringify: stringifyMeta } = require('userscript-meta-f4w');

const fs = require('fs');
const del = require('del');
const path = require('path');

const { importModules } = require('./lib/importModules.js');
const { metadata } = require('./src/metadata.js');

const paths = {
  scss: 'src/css/**/*.scss',
  css: ['dist/*.css', '!dist/*.min.css'],
  html: 'src/html/**/*.html',
  js: ['src/index.js', 'src/js/**/*.js'],
};

const regex = {
  import: /^import(?: \w+ from)? '([^']+\.js)';/gm,
  include: /include: ([^'\n]+)/g,
};

const cleanTasks = {
  css: function cssCleanTask() {
    return del(`dist/*.css`);
  },
  html: function htmlCleanTask() {
    return del(`dist/*.html`);
  },
  js: function jsCleanTask() {
    return del(`dist/${metadata.name}.user.js`);
  },
  all: function distCleanTask() {
    return del('dist');
  },
};

function metadataTask() {
  return newFile(`${metadata.name}.meta.js`, '', { src: true })
    .pipe(modifyContent(() => stringifyMeta(metadata)))
    .pipe(dest('dist'))
    .pipe(rename(`${metadata.name}.dev.js`))
    .pipe(
      modifyContent((content) => {
        return [
          content.replace(new RegExp(`(^// @name *${metadata.name})`, 'm'), '$1 [DEV]'),
          `GM_xmlhttpRequest({\n  url: 'http://192.168.1.39:3905/user-script-grunt?folder=${metadata.name}&_=.js',`,
          '  // eslint-disable-next-line no-eval',
          '  onload: ({ responseText }) => eval(responseText),',
          '});\n',
        ].join('\n');
      })
    )
    .pipe(dest('dist'));
}

function cssTask() {
  return src(paths.scss)
    .pipe(flatten())
    .pipe(sass())
    .pipe(dest('dist'))
    .pipe(postcss([cssnano()]))
    .pipe(
      rename((pathObject) => {
        return {
          ...pathObject,
          basename: `${pathObject.basename}.min`,
          // dirname
          // extname
        };
      })
    )
    .pipe(dest('dist'));
}

function htmlTask() {
  return src(paths.html)
    .pipe(flatten())
    .pipe(htmlmin({ collapseWhitespace: !0 }))
    .pipe(dest('dist'));
}

function jsTask() {
  return src('src/index.js')
    .pipe(modifyContent(importModules))
    .pipe(
      replace(regex.include, (match, fileName) => {
        return fs.readFileSync(path.resolve('./dist', fileName), 'utf8');
      })
    )
    .pipe(replace(/export default \w+;/g, ''))
    .pipe(replace(/\n{2,}/g, '\n\n'))
    .pipe(rename(`${metadata.name}.user.js`))
    .pipe(prependFile(`dist/${metadata.name}.meta.js`))
    .pipe(dest('dist'));
}

function watchTask() {
  watch(paths.scss, series(cleanTasks.css, cleanTasks.js, cssTask, jsTask));
  watch(paths.html, series(cleanTasks.html, cleanTasks.js, htmlTask, jsTask));
  watch(paths.js, series(cleanTasks.js, jsTask));
}

// eslint-disable-next-line no-unused-vars
function waitTask() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

exports.default = series(
  //
  cleanTasks.all,
  metadataTask,
  cssTask,
  htmlTask,
  jsTask,
  watchTask
);
