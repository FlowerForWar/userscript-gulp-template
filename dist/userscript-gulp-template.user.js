// ==UserScript==
// @name           userscript-gulp-template
// @version        0.0.1
// @namespace      https://github.com/FlowerForWar
// @description    User script template that acts as module and tries to simulate imports
// @author         FlowerForWar
// @match          *://*/*
// @grant          GM.getValue
// @grant          GM_getValue
// @grant          GM.setValue
// @grant          GM_setValue
// @grant          GM.xmlHttpRequest
// @grant          GM_xmlhttpRequest
// @grant          GM.setClipboard
// @grant          GM_setClipboard
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
// @icon           https://violentmonkey.github.io/icons/icon-48x48.png
// @license        MIT
// ==/UserScript==

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