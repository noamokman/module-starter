import fs from 'fs';
import {join} from 'path';
import cpr from 'cpr';
import pify from 'pify';
import readPkg from 'read-pkg';
import writePkg from 'write-pkg';
import execa from 'execa';
import pCatchIf from 'p-catch-if';
import Handlebars from 'handlebars';
import parseGithubUrl from 'parse-github-url';
import partial from './partial.js';
import partialCli from './partial-cli.js';

const {rename, readFile, writeFile} = pify(fs);
const cp = pify(cpr);

export function copyStaticFiles ({path, cli}) {
  return cp(join(__dirname, '../static/common'), path, {overwrite: true})
    .then(() => cli && cp(join(__dirname, '../static/cli'), path, {overwrite: true}))
    .then(() => rename(join(path, 'gitignore'), join(path, '.gitignore')));
}

export function fillPackageJson ({path, cli}) {
  return readPkg(path)
    .catch(pCatchIf(({code}) => code === 'ENOENT', () => execa('npm', [
      'init',
      '-y'
    ], {cwd: path})
      .then(() => readPkg(path))))
    .then(pkg => {
      let newPkg = {...pkg, ...partial};

      delete newPkg._id;
      delete newPkg.readme;

      if (cli) {
        newPkg = {
          ...newPkg,
          ...partialCli,
          bin: {
            [pkg.name]: `bin/${pkg.name}`
          }
        };

        newPkg.description = newPkg.description || `${pkg.name} cli`;
      }

      return writePkg(path, newPkg);
    });
}

export function renameBin ({path}) {
  return readPkg(path)
    .then(({name}) => pify(rename)(join(path, 'bin', 'module-starter'), join(path, 'bin', name)));
}

export function createReadme ({path, cli}) {
  return Promise.all([
    readFile(join(__dirname, '..', 'static', 'templates', 'readme.hbs')),
    readPkg(path)
  ])
    .then(([buffer, {name, description, author = {}, license = 'MIT', repository = {}}]) => {
      const template = Handlebars.compile(buffer.toString());
      const repo = repository.url && parseGithubUrl(repository.url).repo;

      const readme = template({cli, name, description, hasAuthor: author.url && author.name, author, license, repo});

      return writeFile(join(path, 'README.md'), readme);
    });
}

export function initializeModuleDirectory ({path, cli, readme}) {
  return copyStaticFiles({path, cli})
    .then(() => fillPackageJson({path, cli}))
    .then(() => readme && createReadme({path, cli}))
    .then(() => cli && renameBin({path}));
}