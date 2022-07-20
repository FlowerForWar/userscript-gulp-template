<p align="center">
  <a href="https://gulpjs.com">
    <img width="230" height="230" src="https://github.com/FlowerForWar/scrapyard/raw/main/gulp.svg" />
  </a>
  <p align="center">Made possible with Gulp</p>
</p>

### Installation

- Clone or copy this repository
- `npm install`
- `npm start`

### Notes

- This project assumes you are using Violentmonkey or Tampermonkey, and gives an option to support Greasemonkey.

---

#### Build configuration

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
