/**
 * Module dependencies.
 */

var express = require('express')
	, config = require('./config')
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

var amqp = require('amqp');

var connection = amqp.createConnection(config.rabbitmq);

connection.on('ready', function () {

	connection.queue('debugServer', {'durable': true, autoDelete: false}, function(q){

		// Receive messages
		q.subscribe(function (message, header, type) {
			var key = type.routingKey;
			var value = message.data.toString();

			logs.incoming(key, value);
		});
	});
});

app.configure('development', function ()
{
	app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function ()
{
	console.log("Logger server listening on port " + app.get('port'));
});
