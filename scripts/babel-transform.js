'use strict';

const babelJest = require('babel-jest');
const babelrc = require('./babelrc');

module.exports = babelJest.createTransformer(
  babelrc({
    modules: true,
  })
);
