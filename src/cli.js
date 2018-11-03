import {resolve} from 'path';
import program, {BOOL} from 'caporal';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import {initializeModuleDirectory} from '.';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('[path]', 'Directory to initialize', null, process.cwd())
  .option('-c, --cli', 'Initialize a CLI module', BOOL, false)
  .option('--readme', 'Should overwrite the readme', BOOL, true)
  .action(({path}, {cli, readme}, logger) => {
    initializeModuleDirectory({path: resolve(path), cli, readme})
      .then(() => {
        logger.info('All done!');

        notifier.notify();
      })
      .catch(console.error);
  });

/**
 * Handle cli arguments
 *
 * @param {string[]} argv - string array of the arguments
 */
export default argv => {
  program
    .parse(argv);
};