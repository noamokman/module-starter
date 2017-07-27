import program from 'commander';
import {version} from '../package.json';
import add from './';

program.version(version)
  .description('CLI Tool')
  .usage('[options] [path]')
  .option('-t, --test', 'Add 2 numbers');

export default argv => {
  program
    .parse(argv);

  if (program.test) {
    console.log(`Adding numbers 1 and 2 : ${add(1, 2)}`);
  }
};