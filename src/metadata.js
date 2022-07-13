/**
 * This file will be built once, and will not be watched.
 * If you make changes to it, you will have to terminate and
 * start the package again.
 */

const { name, version, description, author, license } = require('../package.json');

exports.metadata = {
  name,
  version,
  namespace: `https://github.com/${author}`,
  description,
  author,
  match: ['*://*/*'],
  grant: [
    //
    'GM.getValue',
    'GM_getValue',
    'GM.setValue',
    'GM_setValue',
    'GM.xmlHttpRequest',
    'GM_xmlhttpRequest',
    'GM.setClipboard',
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
  icon: 'https://violentmonkey.github.io/icons/icon-48x48.png', // https://www.google.com/s2/favicons?sz=64&domain=github.com
  license,
};
