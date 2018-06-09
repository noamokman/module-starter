# module-starter [![Build Status](https://travis-ci.org/noamokman/module-starter.svg?branch=master)](https://travis-ci.org/noamokman/module-starter) [![Greenkeeper badge](https://badges.greenkeeper.io/noamokman/module-starter.svg)](https://greenkeeper.io/)

a cli tool to help you start a new node module

## Installation
``` bash
$ [sudo] npm install module-starter -g
```

### Preview
See the output of this module [here](https://github.com/noamokman/module-starter-sample)

Check out the `cli` branch [here](https://github.com/noamokman/module-starter-sample/tree/cli)

## Usage

Bootstrap a new module repository with these steps:

* Clone your repository

* run `npm init` with your preferred values (if no package json is found, this module will run `npm init -y` for you)

* run `module-starter` in the folder

### CLI
``` bash
$ module-starter

   module-starter 0.0.0 - a cli tool to help you start a new node module
     
   USAGE

     module-starter [path]

   ARGUMENTS

     [path]      Directory to initialize      optional      default: "/path/to/cwd"

   OPTIONS

     -c, --cli      Initialize a CLI module          optional      default: false
     --readme       Should overwrite the readme      optional      default: true

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    

```

### Example
``` bash
git clone https://github.com/me/my-module
cd my-module
module-starter
```

### CLI
You can also generate a module with a CLI
``` bash
git clone https://github.com/me/my-module
cd my-module
module-starter --cli
```

## License

[MIT](LICENSE)