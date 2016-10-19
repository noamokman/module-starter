import {join} from 'path';
import cpr from 'cpr';
import pify from 'pify';
import jsonfile from 'jsonfile';
import _ from 'lodash';
import {rename} from 'fs';
import partial from './partial.js';
const jf = pify(jsonfile);

export function copyStaticFiles ({path}) {
  return pify(cpr)(join(__dirname, '../static'), path, {overwrite: true})
    .then(() => pify(rename)(join(path, 'gitignore'), join(path, '.gitignore')));
}

export function fillPackageJson ({path}) {
  const pkgPath = join(path, 'package.json');

  return jf.readFile(pkgPath)
    .then(pkg => {
      const newPkg = _.merge(pkg, partial);

      return jf.writeFile(pkgPath, newPkg, {spaces: 2});
    });
}

export function initilizeModuleDirectory ({path}) {
  return copyStaticFiles({path})
    .then(() => fillPackageJson({path}));
}