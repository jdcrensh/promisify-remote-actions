'use strict';

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const runBabel = require('./run-babel');

const pkgJsonPath = require.resolve(path.join(process.cwd(), 'package.json'));
const pkgJson = require(pkgJsonPath);

const srcRoot = path.join(process.cwd(), 'src');

process.env.BABEL_DISABLE_CACHE = 1;

const es = async () => {
  const esRoot = path.join(process.cwd(), 'es');
  await fs.remove(esRoot);
  await runBabel(srcRoot, esRoot, { modules: false });
};

const cjs = async () => {
  const cjsRoot = path.join(process.cwd(), 'cjs');
  await fs.remove(cjsRoot);
  await runBabel(srcRoot, cjsRoot, { modules: true });
};

const message = msg => `${pkgJson.name} ${msg}`;

(async () => {
  try {
    console.log(message(chalk.cyan('building...')));
    const tasks = { es: es(), cjs: cjs() };
    await Promise.all(Object.values(tasks));
    console.log(
      message(chalk`{green created {bold ${Object.keys(tasks).join(', ')}}}`)
    );
  } catch (err) {
    console.error(message(err.stack || err.toString()));
    process.exit(1);
  }
})();
