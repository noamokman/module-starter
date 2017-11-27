import {resolve} from 'path';
import program from 'caporal';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import {initilizeModuleDirectory} from '.';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('[path]', 'Directory to initialize', null, process.cwd())
  .option('-c, --cli', 'Initialize a CLI module', program.BOOL, false)
  .action(({path}, {cli}, logger) => initilizeModuleDirectory({path: resolve(path), cli})
    .then(() => {
      logger.info('All done!');

      notifier.notify();
    })
    .catch(logger.error));

/**
 * Handle cli arguments
 *
 * @param {string[]} argv - string array of the arguments
 */
export default argv => {
  program
    .parse(argv);
};