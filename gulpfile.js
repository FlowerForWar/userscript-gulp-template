/**
 * This file will not be watched.
 * If you make changes to it, you will have to terminate and
 * start the package again.
 */

require('paint-console');
const { src, dest, watch, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const htmlmin = require('gulp-htmlmin');

const newFile = require('gulp-file');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const noop = require('gulp-noop');

const modifyContent = require('gulp-modifier');
const { prependText, prependFile } = require('gulp-append-prepend-no-trim');
const { stringify: stringifyMeta } = require('userscript-meta-f4w');

const fs = require('fs');
const del = require('del');
const path = require('path');

const buildConfig = require('./build.config.js');
const { importModules } = require('./lib/importModules.js');
const { metadata, metadataDev } = require('./src/metadata.js');

const paths = {
  scss: 'src/scss/*.scss',
  css: ['dist/*.css' /* '!dist/*.min.css' */],
  html: 'src/html/*.html',
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

const metadataTasks = {
  user: function metadataTask() {
    return newFile(`${metadata.name}.meta.js`, '', { src: true })
      .pipe(modifyContent(() => stringifyMeta(metadata)))
      .pipe(dest('dist'));
  },
  dev: function metadataDevTask() {
    return newFile(`${metadata.name}.dev.js`, '', { src: true })
      .pipe(modifyContent(() => stringifyMeta(metadataDev)))
      .pipe(
        modifyContent((content) => {
          return [
            content,
            `GM_xmlhttpRequest({\n  url: 'http://192.168.1.39:3905/user-script-grunt?folder=${metadata.name}&_=.js',`,
            '  // eslint-disable-next-line no-eval',
            '  onload: ({ responseText }) => eval(responseText),',
            '});\n',
          ].join('\n');
        })
      )
      .pipe(dest('dist'));
  },
};

function cssTask() {
  const scssStream = src(paths.scss).pipe(sass()).pipe(dest('dist'));
  if (buildConfig.cssMinify) {
    // console.info('Minifing css files..');
    return scssStream
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
  // console.warn('Minifing css option is disabled');
  return scssStream;
}

function htmlTask() {
  return (
    src(paths.html)
      // .pipe(flatten())
      .pipe(htmlmin({ collapseWhitespace: !0 }))
      .pipe(dest('dist'))
  );
}

function jsTask() {
  return (
    src('src/index.js')
      //
      /** `Import` replacements */
      .pipe(buildConfig.importSupport ? modifyContent(importModules) : noop())

      /** `Include` replacements */
      .pipe(
        buildConfig.cssSupport || buildConfig.htmlMinify
          ? replace(regex.include, (match, fileName) => {
              return fs.readFileSync(path.resolve('./dist', fileName), 'utf8');
            })
          : noop()
      )

      /** `Cleaning up` replacements */
      .pipe(buildConfig.importSupport ? replace(/export default \w+;/g, '') : noop())
      .pipe(replace(/\n{2,}/g, '\n\n'))

      /** Inserting the source URL if one of these options is enabled, `cssSupport`,
       * `htmlMinify` or `importSupport`.
       */
      .pipe(
        buildConfig.cssSupport || buildConfig.htmlMinify || buildConfig.importSupport
          ? prependText(
              `/**\n * Source files are available at ${metadata.homepageURL}/tree/main/src\n */\n`
            )
          : noop()
      )

      /** Inserting the user script metadata block */
      .pipe(prependFile(`dist/${metadata.name}.meta.js`))

      .pipe(rename(`${metadata.name}.user.js`))
      .pipe(dest('dist'))
  );
}

// eslint-disable-next-line no-unused-vars
function watchTask() {
  if (buildConfig.cssSupport) {
    watch(paths.scss, series(cleanTasks.css, cleanTasks.js, cssTask, jsTask));
  }

  if (buildConfig.htmlMinify) {
    watch(paths.html, series(cleanTasks.html, cleanTasks.js, htmlTask, jsTask));
  }

  watch(paths.js, series(cleanTasks.js, jsTask));
}

// eslint-disable-next-line no-unused-vars
function waitTask() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
}

const defaultTasks = [
  cleanTasks.all,
  metadataTasks.user,
  metadataTasks.dev,
  buildConfig.cssSupport && cssTask,
  buildConfig.htmlMinify && htmlTask,
  jsTask,
  watchTask,
].filter(Boolean);

// console.log(defaultTasks);

exports.default = series(...defaultTasks);
