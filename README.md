<p align="center">
  <a href="https://gulpjs.com">
    <img width="230" height="230" src="https://github.com/FlowerForWar/userscript-gulp-template/raw/main/src/icons/gulp.svg" />
  </a>
  <p align="center">Made possible with Gulp</p>
</p>

### Installation

- Clone or copy this repository
- `npm install`
- `npm start`, which will build the files to the `dist` folder, and watch for changes.

### Notes

- This project assumes you are using Violentmonkey or Tampermonkey, and gives an option to support Greasemonkey.

---

### Build configuration

```js
// './build.config.js'

module.exports = {
  /**
   * If enabled, `scss` files located at `./src/scss` folder, will be compiled to `css` files.
   * These compiled `css` files will be saved at `./dist` folder, and can be included in any
   * of the `js` files later, by their original names, but with `css` extensions.
   */
  cssSupport: true,

  /**
   * If enabled, the already compiled `css` files located at `./dist`, will have minified versions
   * next to them, and can be included in any of the `js` files later, by their original names,
   * plus `.min`, and with `css` extensions.
   * This option is ignored when `cssSupport` is disabled.
   */
  cssMinify: true,

  /**
   * If enabled, `html` files located at `./src/html` folder, will be minified.
   * These minified `html` files will be saved at `./dist` folder, and can be included in any
   * of the `js` files later, by their original names.
   */
  htmlMinify: true,

  /**
   * If enabled, it will allow the `index.js` file to use import, to import other modules,
   * that can import other modules themselves.
   */
  importSupport: true,
};
```

### Example from this repository

```js
// './src/metadata.js'

const { name, version, description, author, license } = require('../package.json');

const metadata = {
  name,
  version,
  namespace: `https://github.com/${author}`,
  description,
  author,
  match: [
    //
    '*://*/*',
  ],
  grant: [
    /**
     * To disable grant, don't remove its key, instead, comment all the GM functions.
     * Also, no need to add the Greasemonkey version of the function if the word `Greasemonkey`
     * is mentioned in one of the keys, at the `compatible` section.
     */
    'GM_getValue',
    'GM_setValue',
    'GM_xmlhttpRequest',
    'GM_setClipboard',
  ],
  'run-at': 'document-start',
  noframes: '',
  compatible: [
    //
    'edge Tampermonkey or Violentmonkey',
    'firefox Greasemonkey, Tampermonkey or Violentmonkey',
    'chrome Tampermonkey or Violentmonkey',
    'opera Tampermonkey or Violentmonkey',
  ],
  supportURL: `https://github.com/${author}/${name}/issues`,
  homepageURL: `https://github.com/${author}/${name}`,
  updateURL: `https://github.com/${author}/${name}/raw/main/dist/${name}.meta.js`,
  downloadURL: `https://github.com/${author}/${name}/raw/main/dist/${name}.user.js`,
  icon: `https://github.com/${author}/${name}/blob/main/src/icons/user.png?raw=true`,
  // icon: 'https://www.google.com/s2/favicons?sz=64&domain=github.com',
  license,
};

// ..

exports.metadata = metadata;
```

```js
// './src/index.js'

import fancyFunction from './js/fancyFunction.js';
import addStyle from './js/addStyle.js';

fancyFunction();

addStyle(
  `
include: another.css
`
);

addStyle('include: main.min.css');

document.body.insertAdjacentHTML('beforeend', 'include: element.html');

console.log('userscript-modules-template');
```

#### The output after the first run

```js
// ==UserScript==
// @name           userscript-gulp-template
// @version        0.0.1
// @namespace      https://github.com/FlowerForWar
// @description    User script template that acts as module and tries to simulate imports
// @author         FlowerForWar
// @match          *://*/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_setClipboard
// @grant          GM.getValue
// @grant          GM.setValue
// @grant          GM.xmlhttpRequest
// @grant          GM.setClipboard
// @run-at         document-start
// @noframes
// @compatible     edge Tampermonkey or Violentmonkey
// @compatible     firefox Greasemonkey, Tampermonkey or Violentmonkey
// @compatible     chrome Tampermonkey or Violentmonkey
// @compatible     opera Tampermonkey or Violentmonkey
// @supportURL     https://github.com/FlowerForWar/userscript-gulp-template/issues
// @homepageURL    https://github.com/FlowerForWar/userscript-gulp-template
// @updateURL      https://github.com/FlowerForWar/userscript-gulp-template/raw/main/dist/userscript-gulp-template.meta.js
// @downloadURL    https://github.com/FlowerForWar/userscript-gulp-template/raw/main/dist/userscript-gulp-template.user.js
// @icon           https://github.com/FlowerForWar/userscript-gulp-template/blob/main/src/icons/user.png?raw=true
// @license        MIT
// ==/UserScript==

/**
 * Source files are available at https://github.com/FlowerForWar/userscript-gulp-template/tree/main/src
 */

const myString = 'Hello';

const myArray = [1, 2, myString];

function fancyFunction() {
  console.log(myArray);
}

function addStyle(styleText, id) {
  const head = document.getElementsByTagName('head')[0] || document.documentElement;
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = styleText;
  if (id) {
    style.setAttribute('id', id);
  }
  head.appendChild(style);
  return style;
}

fancyFunction();

addStyle(
  `
.info {
  background: DarkGray;
  box-shadow: 0 0 1px rgba(169, 169, 169, 0.25);
  color: #fff;
}

.alert {
  background: DarkRed;
  box-shadow: 0 0 1px rgba(139, 0, 0, 0.25);
  color: #fff;
}

.success {
  background: DarkGreen;
  box-shadow: 0 0 1px rgba(0, 100, 0, 0.25);
  color: #fff;
}
`
);

addStyle('body{background-color:#ff0}');

document.body.insertAdjacentHTML('beforeend', '<ul id="list"><li>first</li><li>second</li></ul>');

console.log('userscript-modules-template');
```
