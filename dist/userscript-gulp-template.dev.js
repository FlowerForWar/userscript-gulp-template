// ==UserScript==
// @name           userscript-gulp-template  [DEV]
// @version        0.0.0
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
// @icon           https://github.com/FlowerForWar/userscript-gulp-template/blob/main/src/icons/dev.png?raw=true
// @license        MIT
// ==/UserScript==

GM_xmlhttpRequest({
  url: 'http://192.168.1.39:3905/user-script-grunt?folder=userscript-gulp-template&_=.js',
  // eslint-disable-next-line no-eval
  onload: ({ responseText }) => eval(responseText),
});
