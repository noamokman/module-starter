# module-starter [![Build Status](https://travis-ci.org/noamokman/module-starter.svg?branch=master)](https://travis-ci.org/noamokman/module-starter)

a cli tool to help you start a new node module

## Installation
``` bash
$ [sudo] npm install module-starter -g
```

## Usage

Bootstrap a new module repository with these steps:

* Clone your repository

* run `npm init` with your preferred values

* run `module-starter` in the folder

### CLI
``` bash
$ module-starter
  
  Options:

    -h, --help              output usage information
    -V, --version           output the version number
    -c, --cli               Initialize a CLI Tool module
```

### Example
``` bash
git clone https://github.com/me/my-module
cd my-module
npm init -y
module-starter
```

## License

[MIT](LICENSE)