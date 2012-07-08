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
  '  header h1 {',
  '   font-size: 3em;',
  '   color: #327CCB;',
  '  }'
].join('\n');

// Template for /templates/layout.jade
exports.layout = [
  '!!!',
  'html',
  '  head',
  '    meta(charset= "utf-8")',
  '    title= Kel',
  '    link(rel= "stylesheet", href= "/css/style.css")',
  '  body',
  '    header',
  '      a(href= "/")',
  '        h1= Kel',
  '    section',
  '      != body'
].join('\n');

// Template for /pages/index.md
exports.index = [
  'If you can read this, then you have created your first kel site!',
  '',
  '## First Steps',
  '1. Create pages by adding files ending with `.md` inside the `/page` folder',
  '2. Create your first blog post by editing the `/posts/hello-world.md` file',
  '3. Generate your kel site using `kel generate`'
].join('\n');

// Template for /posts/hello.md
exports.hello = [
  '<!---',
  'title: Hello World!',
  'time: Sun  8 Jul 2012 12:47:35 EST',
  '-->',
  '# Hello World!',
  'This is an example blog post'
].join('\n');
