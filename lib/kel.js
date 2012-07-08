/*
 * Project: Kel
 * Description: Main functions of kel are included here
 *
 */

var kel = exports,
    path = require('path'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    template = require('./template');;

kel.generate = function () {
  console.log('Generating');
}

kel.preview = function () {
  console.log('Previewing');
}

// Initialize kel site
kel.init = function(argv) {
  path = argv[0] || '.';
  console.log('Creating kel site in', path);

  // First create all the folders and then the files
  mkdir(path, function() {
    mkdir(path + '/public', function() {
      mkdir(path + '/public/css', function() {
        write(path + '/public/css/style.css', template.css);
      });
    });
    mkdir(path + '/templates', function() {
      write(path + '/templates/layout.jade', template.layout);
    });
    mkdir(path + '/pages', function() {
      write(path + '/pages/index.md', template.index);
    });
    mkdir(path + '/posts', function() {
      write(path + '/posts/hello.md', template.hello);
    });
  });
 }

// Write file function
var write = function(path, str) {
  fs.writeFile(path, str, function(err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
  });
} 

// Make directory function
var mkdir = function(path, fn) {
  mkdirp(path, function(err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
}
