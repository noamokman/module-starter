import {resolve} from 'path';
import program from 'commander';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
const moduleStarter = require('./');
const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description('Module starter cli tool')
  .usage('[options] [path]')
  .option('-c --cli', 'Initialize a CLI Tool module');

/**
 * Handle cli arguments
 *
 * @param {string[]} argv - string array of the arguments
 * @returns {void}
 */
export default argv => {
  program
    .parse(argv);

  let path = process.cwd();

  if (program.args.length) {
    path = resolve(program.args.shift());
  }

  return moduleStarter.initilizeModuleDirectory({path, cli: program.cli})
    .then(() => {
      console.log('All done!');

      notifier.notify();
    })
    .catch(console.log);
};