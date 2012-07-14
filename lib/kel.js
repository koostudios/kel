/*
 * Project: Kel
 * Description: Main functions of kel are included here
 *
 */

var kel = exports,
    template = require('./template'),
    fs = require('fs'),
    async = require('async'),
    mkdirp = require('mkdirp'),
    jade = require('jade'),
    md = require('node-markdown').Markdown,
    yaml = require('js-yaml');

// -----------------------------------------------
// Generate kel site
// -----------------------------------------------

kel.generate = function (argv) {
  console.log('Generating static site in /public...');
  var path = argv[1] || '.';

  // Create individual pages
  fs.readdir(path + '/pages', function(err, files) {
    if (err) return console.log('Missing /pages folder. Are you sure this is a kel site?');
    saveFiles('pages', path, files);
  });

  fs.readdir(path + '/posts', function(err, files) {
    if (err) return console.log('Missing /posts folder. Skipping blog.');
    async.sortBy(files, function (file, sort) {
      fs.readFile(path + '/posts/' + file, 'utf8', function(err, data) {
        var props = yaml.load(data.split(/\n\n/)[0]);
        sort(err, props.timestamp);
      });
    }, function (err, res) {
      if (err) throw err;
      saveFiles('posts', path, res);
      // Now create index
      async.concatSeries(res.reverse(), function(file, cb) {
        fs.readFile(path + '/posts/' + file, function(err, data) {
          var data = data.toString().split(/\n\n/),
              props = yaml.load(data[0]);
          data.shift();
          var body = md(data.join('\n\n')),
              post = {'title': props.title, 'timestamp': props.timestamp, 'body': body};
          cb(err, post);
        });
      }, function(err, posts) {
        if (err) throw err;
        var options = {posts: posts};
        jade.renderFile(path + '/templates/posts.jade', options, function(err, html) {
          write(path + '/public/blog/index.htm', html);
        });
      });
    });
  });
};

// -----------------------------------------------
// Initialize kel site
// -----------------------------------------------

kel.init = function(argv) {
  var path = argv[0] || '.';
  console.log('Creating a kel site in', path + '...');

  // First create all the folders and then the files
  mkdir(path, function() {
    mkdir(path + '/public', function() {
      mkdir(path + '/public/css', function() {
        write(path + '/public/css/style.css', template.css);
      });
      mkdir(path + '/public/blog');
    });
    mkdir(path + '/templates', function() {
      write(path + '/templates/pages.jade', template.pages);
      write(path + '/templates/posts.jade', template.posts);
    });
    mkdir(path + '/pages', function() {
      write(path + '/pages/index.md', template.index);
    });
    mkdir(path + '/posts', function() {
      write(path + '/posts/hello.md', template.hello);
    });
  });
};

// -----------------------------------------------
// Helper Functions
// -----------------------------------------------

// Save files in an array
var saveFiles = function(type, path, arr) {
  async.forEach(arr, function (file, cb) {
    async.waterfall([
      function(cb) {
        fs.readFile(path + '/' + type + '/' + file, 'utf8', cb);
      }, function(data, cb) {
        if (type == 'posts') {
          var data = data.split(/\n\n/),
              props = yaml.load(data[0]);
          data.shift();
          var body = md(data.join('\n\n')),
              options = {posts: [{'title': props.title, 'timestamp': props.timestamp, 'body': body}]};
        } else if (type == 'pages') {
          var options = {body: md(data)};
        };
        jade.renderFile(path + '/templates/' + type + '.jade', options, cb);
      },function(html, cb) {
        if (type == 'posts') {
          var writePath = path + '/public/blog/' + file.split('.')[0] + '.htm';
        } else if (type == 'pages') {
          var writePath = path + '/public/' + file.split('.')[0] + '.htm'
        };
        write(writePath, html);
        cb(null, 'done');
      }
    ], function (err, done) {
      if (err) throw err;
    });
  });
};

// Write file function
var write = function(path, str) {
  fs.writeFile(path, str, function(err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
  });
};

// Make directory function
var mkdir = function(path, fn) {
  mkdirp(path, function(err) {
    if (err) throw err;
    console.log('   \033[36mcreate\033[0m : ' + path);
    fn && fn();
  });
};
