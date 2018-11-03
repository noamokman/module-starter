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

export const copyStaticFiles = async ({path, cli}) => {
  await cp(join(__dirname, '../static/common'), path, {overwrite: true});

  if (cli) {
    await cp(join(__dirname, '../static/cli'), path, {overwrite: true});
  }

  await rename(join(path, 'gitignore'), join(path, '.gitignore'));
};

export const fillPackageJson = async ({path, cli}) => {
  const pkg = await readPkg(path)
    .catch(pCatchIf(({code}) => code === 'ENOENT', async () => {
      await execa('npm', [
        'init',
        '-y'
      ], {cwd: path});

      return readPkg(path);
    }));

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
};

export const renameBin = async ({path}) => {
  const {name} = await readPkg(path);

  return rename(join(path, 'bin', 'module-starter'), join(path, 'bin', name));
};

export const createReadme = async ({path, cli}) => {
  const [buffer, {name, description, author = {}, license = 'MIT', repository = {}}] = await Promise.all([
    readFile(join(__dirname, '..', 'static', 'templates', 'readme.hbs')),
    readPkg(path)
  ]);

  const template = Handlebars.compile(buffer.toString());
  const repo = repository.url && parseGithubUrl(repository.url).repo;

  const readme = template({cli, name, description, hasAuthor: author.url && author.name, author, license, repo});

  return writeFile(join(path, 'README.md'), readme);
};

export const initializeModuleDirectory = async ({path, cli, readme}) => {
  await copyStaticFiles({path, cli});

  await fillPackageJson({path, cli});

  if (readme) {
    await createReadme({path, cli});
  }

  if (cli) {
    await renameBin({path});
  }
};