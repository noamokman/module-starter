export default {
  version: '0.0.0',
  main: 'lib/index.js',
  scripts: {
    lint: 'run-p lint-*',
    'lint-src': 'eslint src --fix',
    'lint-tests': 'eslint __tests__ --fix',
    precommit: 'lint-staged',
    commitmsg: 'validate-commit-msg',
    babel: 'babel src -d lib -s',
    build: 'rimraf lib && npm run babel',
    jest: 'jest',
    coveralls: 'cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
    prepublishOnly: 'npm run build',
    test: 'npm run lint && npm run jest'
  },
  engines: {
    node: '>=4'
  },
  'lint-staged': {
    '*.js': [
      'eslint --fix',
      'git add'
    ]
  },
  devDependencies: {
    'babel-cli': '^6.24.1',
    'babel-jest': '^20.0.3',
    'babel-preset-env': '^1.6.0',
    coveralls: '^2.13.1',
    eslint: '^4.3.0',
    'eslint-config-noamokman': '^6.0.1',
    husky: '^0.14.3',
    'lint-staged': '^4.0.2',
    'npm-run-all': '^4.0.2',
    rimraf: '^2.6.1',
    'validate-commit-msg': '^2.13.1'
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
    }
  }
};