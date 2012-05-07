fs = require 'fs'
exp = require 'express'
app = exp.createServer()
md = require('node-markdown').Markdown
config = require './config'
dir = __dirname + '/templates/' + config.template.name

app.configure () ->
	app.set 'view engine', config.template.engine
	app.set 'view options', {layout: false}
	app.set 'views', dir
	app.use exp.static dir + '/public'
	
app.listen config.port
console.log 'Server running at port ' + app.address().port

app.get '/', (req, res, next) ->
	fs.readFile __dirname + '/pages/index.md', (err, data) ->
		if err 
			next()
		else
			res.render 'layout', {body: md(data.toString()), config: config}

app.get '/:id', (req, res, next) ->
	fs.readFile __dirname + '/pages/' + req.params.id + '.md', (err, data) ->
		if err
			next()
		else
			res.render 'layout', {body: md(data.toString()), config: config}
			
app.get '/*', (req, res) ->
	res.render 'layout', {body: '<b>404</b> Oopsies, not found.'}