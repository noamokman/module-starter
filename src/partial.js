export default {
  version: '0.0.0',
  main: 'lib/index.js',
  module: 'src/index.js',
  scripts: {
    lint: 'run-p lint-*',
    'lint-src': 'eslint src --fix',
    'lint-tests': 'eslint __tests__ --fix',
    precommit: 'lint-staged',
    commitmsg: 'commitlint -e',
    babel: 'babel src -d lib -s',
    build: 'rimraf lib && npm run babel',
    jest: 'jest',
    coveralls: 'cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
    prepublishOnly: 'npm run build',
    test: 'npm run lint && npm run jest'
  },
  engines: {
    node: '>=6'
  },
  'lint-staged': {
    '*.js': [
      'eslint --fix',
      'git add'
    ]
  },
  devDependencies: {
    '@commitlint/cli': '^5.2.5',
    '@commitlint/config-angular': '^5.1.1',
    'babel-cli': '^6.26.0',
    'babel-jest': '^21.2.0',
    'babel-preset-env': '^1.6.0',
    coveralls: '^3.0.0',
    eslint: '^4.13.1',
    'eslint-config-noamokman': '^7.2.0',
    'eslint-plugin-import': '^2.8.0',
    'eslint-plugin-jest': '^21.3.2',
    'eslint-plugin-lodash': '^2.5.0',
    'eslint-plugin-unicorn': '^3.0.1',
    husky: '^0.14.3',
    jest: '^21.2.1',
    'lint-staged': '^6.0.0',
    'npm-run-all': '^4.1.0',
    rimraf: '^2.6.1'
  },
  jest: {
    notify: true,
    collectCoverage: true,
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    },
    testMatch: ['**/__tests__/**/*.spec.js']
  }
};