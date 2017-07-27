import {resolve} from 'path';
import program from 'caporal';
import pkg from '../package.json';
import updateNotifier from 'update-notifier';
const moduleStarter = require('./');
const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .argument('[path]', 'directory to initialize', null, process.cwd())
  .option('-c, --cli', 'Initialize a CLI Tool module', program.BOOL, false)
  .action(({path}, {cli}, logger) => {
    moduleStarter.initilizeModuleDirectory({path: resolve(path), cli})
      .then(() => {
        logger.info('All done!');

        notifier.notify();
      })
      .catch(logger.error);
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