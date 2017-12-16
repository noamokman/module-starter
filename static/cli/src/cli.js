import program, {FLOAT} from 'caporal';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import add from '.';

const notifier = updateNotifier({pkg});

program.version(pkg.version)
  .description(pkg.description)
  .command('add', 'Add two numbers')
  .argument('<a>', 'The first number', FLOAT)
  .argument('<b>', 'The second number', FLOAT)
  .action(({a, b}, options, logger) => {
    logger.info(`${a} + ${b} = ${add(a, b)}`);

    notifier.notify();
  });

export default argv => {
  program
    .parse(argv);
};