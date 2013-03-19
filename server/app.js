/**
 * Module dependencies.
 */

var express = require('express')
	, logs = require('./modules/logs')
	, http = require('http')
	, path = require('path');

var app = express();

app.configure(function ()
{
	app.set('port', process.env.PORT || 3000);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname + '/../', 'client/')));
});

logs.init();

app.configure('development', function ()
{
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function ()
{
	console.log("Logger server listening on port " + app.get('port'));
});
