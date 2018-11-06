'use strict';

module.exports = ({ modules } = {}) => ({
  babelrc: false,
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        useBuiltIns: 'entry',
        modules: modules ? 'commonjs' : false,
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-transform-es2015-destructuring'),
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      { useBuiltIns: true },
    ],
    require.resolve('babel-plugin-transform-runtime'),
    modules && require('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-transform-export-extensions'),
  ].filter(Boolean),
});
