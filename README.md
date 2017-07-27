# module-starter [![Build Status](https://travis-ci.org/noamokman/module-starter.svg?branch=master)](https://travis-ci.org/noamokman/module-starter)

a cli tool to help you start a new node module

## Installation
``` bash
$ [sudo] npm install module-starter -g
```

## Usage

Bootstrap a new module repository with these steps:

* Clone your repository

* run `npm init` with your preferred values (if no package json is found, will run `npm init -y` for you)

* run `module-starter` in the folder

### CLI
``` bash
$ module-starter

   module-starter 2.1.0 - a cli tool to help you start a new node module
     
   USAGE

     module-starter [path]

   ARGUMENTS

     [path]      directory to initialize      optional      default: "/path/to/cwd"

   OPTIONS

     -c, --cli      Initialize a CLI Tool module      optional      default: false

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

## License

[MIT](LICENSE)