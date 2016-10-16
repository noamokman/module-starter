import {resolve} from 'path';
import program from 'commander';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
const moduleStarter = require('./');
const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description('Module starter cli tool')
  .usage('[options] [path]');

/**
 * Handle cli arguments
 *
 * @param {string[]} argv - string array of the arguments
 */
export default argv => {
  program
    .parse(argv);

  let path = process.cwd();

  if (program.args.length) {
    path = resolve(program.args.shift());
  }

  moduleStarter.initilizeModuleDirectory({path})
    .then(() => {
      console.log('All done!');

      notifier.notify();
    })
    .catch(console.log);
};