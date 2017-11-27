import {rename} from 'fs';
import {join} from 'path';
import cpr from 'cpr';
import pify from 'pify';
import jsonfile from 'jsonfile';
import execa from 'execa';
import pCatchIf from 'p-catch-if';
import partial from './partial.js';
import partialCli from './partial-cli.js';

const jf = pify(jsonfile);
const cp = pify(cpr);

export function copyStaticFiles ({path, cli}) {
  return cp(join(__dirname, '../static/common'), path, {overwrite: true})
    .then(() => cli && cp(join(__dirname, '../static/cli'), path, {overwrite: true}))
    .then(() => pify(rename)(join(path, 'gitignore'), join(path, '.gitignore')));
}

export function fillPackageJson ({path, cli}) {
  const pkgPath = join(path, 'package.json');

  return jf.readFile(pkgPath)
    .catch(pCatchIf(({code}) => code === 'ENOENT', () => execa('npm', [
      'init',
      '-y'
    ], {cwd: path})
      .then(() => jf.readFile(pkgPath))))
    .then(pkg => {
      let newPkg = {...pkg, ...partial};

      if (cli) {
        newPkg = {...newPkg, ...partialCli, bin: `bin/${pkg.name}`};
        newPkg.description = newPkg.description || `${pkg.name} cli`;
      }

      return Promise.all([
        newPkg,
        jf.writeFile(pkgPath, newPkg, {spaces: 2})
      ]);
    })
    .then(([pkg]) => pkg);
}

export function renameBin ({path}) {
  return jf.readFile(join(path, 'package.json'))
    .then(({name}) => pify(rename)(join(path, 'bin', 'module-starter'), join(path, 'bin', name)));
}

export function initilizeModuleDirectory ({path, cli}) {
  return copyStaticFiles({path, cli})
    .then(() => fillPackageJson({path, cli}))
    .then(() => cli ? renameBin({path}) : Promise.resolve());
}