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
