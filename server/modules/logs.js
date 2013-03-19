var io = require('socket.io').listen(3001);
var config = require('../config');

var amqp = require('amqp');
var emit = function() { };
var endAmqpConnection = function() {};

io.sockets.on('connection', function (socket) {
	emit = function(key, value) {
		console.log(key, value);
		socket.emit('log', { key: key, value: value });
	};

	socket.on('endAmqpConnection', function() {
		endAmqpConnection();
	});
});

function incoming(key, value){
	emit(key, value);
};

exports.init = function() {
	var connection = amqp.createConnection(config.rabbitmq);

	endAmqpConnection = function() {
		connection.end();
	};

	connection.on('ready', function () {

		connection.queue('debugServer', {'durable': true, autoDelete: false}, function(q){

			// Receive messages
			q.subscribe(function (message, header, type) {
				var key = type.routingKey;
				var value = message.data.toString();

				incoming(key, value);
			});
		});
	});
};