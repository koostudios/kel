/*
 * Project: Kel
 * Description: Provides templates for the basic kel site
 *
 */

// Template for /public/css/style.css
exports.css = [
  'body {',
  '  max-width: 800px;',
  '  margin: 20px auto;',
  '  padding: 20px;',
  '  font-family: "Helvetica Neue", Arial, sans-serif;',
  '  color: #888;',
  '}',
  '',
  'a {',
  '  color: #327CCB;',
  '}',
  '',
  'h1 {',
  '  font-family: "Gill Sans", "Helvetica Neue", Arial, sans-serif;',
  '  font-weight: normal;',
  '  font-size: 3em;',
  '  color: #327CCB;',
  '}',
  '',
  'h2 {',
  '  font-weight: normal;',
  '  color: #000;',
  '}',
  '',
  'footer {',
  '  font-size: 0.8em;',
  '  color: #AAA;',
  '}'
].join('\n');

// Template for /templates/pages.jade
exports.pages = [
  '!!!',
  'html',
  '  head',
  '    meta(charset= "utf-8")',
  '    title= "Kel"',
  '    link(rel= "stylesheet", href= "css/style.css")',
  '  body',
  '    header',
  '      h1= "Kel"',
  '    section',
  '      != body',
  '    footer',
  '      |&copy; 2012. Made with ♥ and ',
  '      a(href= "http://kel.nodester.com")= "Kel"',
  '      |.' 
].join('\n');

// Template for /templates/posts.jade
exports.posts = [
  '!!!',
  'html',
  '  head',
  '    meta(charset= "utf-8")',
  '    title= "Kel"',
  '    link(rel= "stylesheet", href= "../css/style.css")',
  '  body',
  '    header',
  '      h1= "Kel"',
  '    section',
  '      - for post in posts',
  '        h2= post.title',
  '        span= post.time',
  '        p!= post.body',
  '    footer',
  '      |&copy; 2012. Made with ♥ and ',
  '      a(href= "http://kel.nodester.com")= "Kel"',
  '      |.' 
].join('\n');

// Template for /pages/index.md
exports.index = [
  'If you can read this, then you have created your first kel site. Congratulations! Be sure to read the documentation located on the [github page](https://github.com/koostudios/kel) and file [issues](https://github.com/koostudios/kel/issues) there too.',
  '',
  '## First Steps',
  '1. Edit the template located in the `/template/layout.jade` file.', 
  '2. Create pages by adding files ending with `.md` inside the `/page` folder.',
  '3. Create your first blog post by editing the `/posts/hello-world.md` file.',
  '4. Generate your kel site using `kel generate`.'
].join('\n');

// Template for /posts/hello.md
exports.hello = [
  'title: Hello World!',
  'time: Sun  8 Jul 2012 12:47:35 EST',
  '',
  '',
  'This is an example blog post. Note that the properties **must** be separated from the content by two lines.'
].join('\n');
