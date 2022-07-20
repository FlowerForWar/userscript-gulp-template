/**
 * This file will not be watched.
 * If you make changes to it, you will have to terminate and
 * start the package again.
 */

module.exports = {
  /**
   * If enabled, `scss` files located at `./src/scss` folder, will be compiled to `css` files.
   * These compiled `css` files will be saved at `./dist` folder, and can be included in any
   * of the `js` files later, by their original names, but with `css` extensions.
   */
  cssSupport: !0,

  /**
   * If enabled, the already compiled `css` files located at `./dist`, will have minified versions
   * next to them, and can be included in any of the `js` files later, by their original names,
   * plus `.min`, and with `css` extensions.
   * This option is ignored when `cssSupport` is disabled.
   */
  cssMinify: !0,

  /**
   * If enabled, `html` files located at `./src/html` folder, will be minified.
   * These minified `html` files will be saved at `./dist` folder, and can be included in any
   * of the `js` files later, by their original names.
   */
  htmlMinify: !0,

  /**
   * If enabled, it will allow the `index.js` file to use import, to import other modules,
   * that can import other modules themselves.
   */
  importSupport: !0,
};
