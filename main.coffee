# Variables
fs = require 'fs'
exp = require 'express'
app = exp.createServer()
md = require('node-markdown').Markdown
config = require './config'
dir = __dirname + '/templates/' + config.template.name

# Little Functions
snippet = (id) ->
		return md fs.readFileSync __dirname + '/pages/_' + id + '.md', 'utf-8'

locals = (body) ->
	return {body: body, config: config, snippet: snippet}

# App Configuration
app.configure () ->
	app.set 'view engine', config.template.engine
	app.set 'view options', {layout: false}
	app.set 'views', dir
	app.use exp.static dir + '/public'
	
app.listen config.port
console.log 'Server running at port ' + app.address().port

# Routing
app.get '/', (req, res, next) ->
	fs.readFile __dirname + '/pages/index.md', (err, data) ->
		if err 
			next()
		else
			res.render 'layout', locals md data.toString()

app.get '/:id', (req, res, next) ->
	fs.readFile __dirname + '/pages/' + req.params.id + '.md', (err, data) ->
		if err || req.params.id.charAt(0) == '_'
			next()
		else
			res.render 'layout', locals md data.toString()
			
app.get '/*', (req, res) ->
	res.render 'layout', locals '<b>404</b> Oopsies, not found.'