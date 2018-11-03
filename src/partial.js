export default {
  version: '0.0.0',
  main: 'lib/index.js',
  module: 'src/index.js',
  scripts: {
    lint: 'run-p lint-*',
    'lint-src': 'eslint src --fix',
    'lint-tests': 'eslint __tests__ --fix',
    babel: 'babel src -d lib -s',
    build: 'rimraf lib && npm run babel',
    jest: 'jest',
    coveralls: 'cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js',
    prepublishOnly: 'npm run build',
    test: 'npm run lint && npm run jest'
  },
  engines: {
    node: '>=8'
  },
  'lint-staged': {
    '*.js': [
      'eslint --fix',
      'git add'
    ]
  },
  devDependencies: {
    '@babel/cli': '^7.1.2',
    '@babel/core': '^7.1.2',
    '@babel/preset-env': '^7.1.0',
    '@commitlint/cli': '^7.2.1',
    '@commitlint/config-angular': '^7.1.2',
    'babel-core': '^7.0.0-bridge.0',
    'babel-jest': '^23.6.0',
    coveralls: '^3.0.2',
    eslint: '^5.8.0',
    'eslint-config-noamokman': '^8.1.0',
    'eslint-plugin-import': '^2.14.0',
    'eslint-plugin-lodash': '^3.1.0',
    'eslint-plugin-unicorn': '^6.0.1',
    husky: '^1.1.3',
    jest: '^23.6.0',
    'lint-staged': '^8.0.4',
    'npm-run-all': '^4.1.3',
    rimraf: '^2.6.2'
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
  },
  husky: {
    hooks: {
      'commit-msg': 'commitlint -e',
      'pre-commit': 'lint-staged'
    }
  }
};