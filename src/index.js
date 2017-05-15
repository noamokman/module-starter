import {join} from 'path';
import cpr from 'cpr';
import pify from 'pify';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import {rename} from 'fs';
import partial from './partial.js';
import partialCli from './partial-cli.js';
const jf = pify(jsonfile);

export function copyStaticFiles ({path, cli}) {
  return pify(cpr)(join(__dirname, '../static/common'), path, {overwrite: true})
    .then(() => pify(cpr)(join(__dirname, cli ? '../static/cli' : '../static/module'), path, {overwrite: true}))
    .then(() => pify(rename)(join(path, 'gitignore'), join(path, '.gitignore')));
}

export function fillPackageJson ({path, cli}) {
  const pkgPath = join(path, 'package.json');

  return jf.readFile(pkgPath)
    .then(pkg => {
      const newPkg = _.merge(pkg, cli ? partialCli : partial);

      if (cli) {
        newPkg.bin = `bin/${pkg.name}`;
      }

      return jf.writeFile(pkgPath, newPkg, {spaces: 2});
    });
}

export function renameBin ({path}) {
  return jf.readFile(join(path, 'package.json'))
    .then(({name}) => {
      return pify(rename)(join(path, 'bin', 'module-starter'), join(path, 'bin', `${name}`));
    });
}

export function initilizeModuleDirectory ({path, cli}) {
  return copyStaticFiles({path, cli})
    .then(() => fillPackageJson({path, cli}))
    .then(() => cli ? renameBin({path}) : Promise.resolve());
}