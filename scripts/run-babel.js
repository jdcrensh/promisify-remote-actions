'use strict';

const { transform } = require('babel-core');
const fs = require('fs-extra');
const path = require('path');
const babelrc = require('./babelrc');

const buildFile = async (filename, dest, babelOptions = {}) => {
  if (
    path.extname(filename) !== '.js' ||
    path.basename(filename) === 'setupTests.js' ||
    /\.test\.js$/.test(filename)
  ) {
    return;
  }
  const content = await fs.readFile(filename, { encoding: 'utf8' });
  babelOptions.filename = filename;
  const result = transform(content, babelOptions);
  const output = path.join(dest, path.basename(filename));
  await fs.outputFile(output, result.code);
};

const build = async (src, dest, babelOptions = {}, firstFolder = true) => {
  const stats = await fs.stat(src);
  if (stats.isFile()) {
    await buildFile(src, dest, babelOptions);
  } else if (stats.isDirectory()) {
    const outputPath = firstFolder ? dest : path.join(dest, path.basename(src));

    const files = (await fs.readdir(src)).map(file => path.join(src, file));
    await Promise.all(
      files.map(f => build(f, outputPath, babelOptions, false))
    );
  }
};

module.exports = (src, dest, babelConfig = {}) =>
  build(src, dest, babelrc(babelConfig));
