/**
 * This file will be built once, and will not be watched.
 * If you make changes to it, you will have to terminate and
 * start the package again.
 */

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

const metadataDev = { ...metadata };
metadataDev.name += '  [DEV]';
metadataDev.version = '0.0.0';
metadataDev.icon = `https://github.com/${author}/${name}/blob/main/src/icons/dev.png?raw=true`;

/**
 * Granting the `GM_xmlhttpRequest` function for the developer version of the script
 */
if (!metadataDev.grant.includes('GM_xmlhttpRequest')) {
  metadataDev.grant = ['GM_xmlhttpRequest', ...metadataDev.grant];
}

const supportsGreasemonkey =
  metadata.compatible &&
  metadata.compatible.some((key) => key.toLowerCase().includes('greasemonkey'));

/**
 * Automatically add support for Greasemonkey functions, if the word `Greasemonkey`
 * is mentioned in one of the keys, at the `compatible` section.
 */
if (supportsGreasemonkey && metadata.grant.length) {
  metadata.grant = [
    ...metadata.grant,
    ...metadata.grant.map((functionName) => functionName.replace('_', '.')),
  ];
}

if (supportsGreasemonkey && metadataDev.grant.length) {
  metadataDev.grant = [
    ...metadataDev.grant,
    ...metadataDev.grant.map((functionName) => functionName.replace('_', '.')),
  ];
}

exports.metadata = metadata;
exports.metadataDev = metadataDev;
