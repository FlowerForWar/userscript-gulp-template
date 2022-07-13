const fs = require('fs');
const path = require('path');

const regex = {
  import: /^import(?: \w+ from)? '([^']+\.js)';/gm,
  include: /include: ([^'\n]+)/g,
};

function importModules(moduleContent, currentModulePath) {
  return moduleContent.replace(regex.import, (match, relativeModulePath) => {
    const modulePath = path.resolve(path.dirname(currentModulePath), relativeModulePath);
    const chunk = fs.readFileSync(modulePath, 'utf8');
    if (regex.import.test(chunk)) {
      return importModules(chunk, modulePath);
    }
    return chunk;
  });
}

exports.importModules = importModules;
