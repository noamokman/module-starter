export default {
  version: '0.0.0',
  main: 'lib/index.js',
  scripts: {
    lint: 'run-p lint-*',
    'lint-src': 'eslint src --fix',
    'lint-test': 'eslint test --fix',
    precommit: 'lint-staged',
    commitmsg: 'validate-commit-msg',
    babel: 'babel src -d lib -s',
    build: 'rimraf lib && npm run babel',
    coveralls: 'cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
    prepublish: 'npm run build',
    test: 'npm run lint && babel-node ./node_modules/babel-istanbul/lib/cli.js cover ./node_modules/mocha/bin/_mocha --report lcovonly --report text --report html -- --compilers js:babel-register test',
    posttest: 'babel-istanbul check-coverage --statements 100 --functions 100 --branches 100 --lines 100'
  },
  engines: {
    node: '>=4'
  },
  'lint-staged': {
    '**/src/**.js': [
      'eslint --fix',
      'git add'
    ],
    '**/test/**.js': [
      'eslint --fix',
      'git add'
    ]
  },
  devDependencies: {
    'babel-cli': '^6.16.0',
    'babel-istanbul': '^0.11.0',
    'babel-preset-env': '0.0.6',
    'babel-register': '^6.16.3',
    chai: '^3.5.0',
    eslint: '^3.7.1',
    'eslint-config-noamokman': '^4.0.0',
    husky: '^0.11.9',
    'lint-staged': '^3.1.0',
    mocha: '^3.0.2',
    'npm-run-all': '^3.1.1',
    rimraf: '^2.5.4',
    'validate-commit-msg': '^2.8.2'
  }
};