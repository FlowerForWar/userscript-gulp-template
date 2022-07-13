module.exports = {
  env: {
    node: !0,
    commonjs: !0,
    browser: !0,
    es2021: !0,
  },
  extends: [
    //
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    GM_xmlhttpRequest: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'import/extensions': 'off',
    // camelcase: ['error', { allow: ['GM_getValue', 'GM_setValue'] }],
  },
};
