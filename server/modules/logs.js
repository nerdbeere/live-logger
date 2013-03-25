var io = require('socket.io').listen(3001);
var config = require('../config');
var amqp = require('amqp');
var crypto = require('crypto');

var emit = function() { };
var endAmqpConnection = function() {};


var clients = {};


io.sockets.on('connection', function (socket) {

    var client = new Client(socket, new Batch());

    clients[client.id] = client;

    //socket.on('endAmqpConnection', function() {
        //endAmqpConnection();
    //});
});

setInterval(function() {

    for(var i in clients) {
        var client = clients[i];

        var batch = client.swapBatch(new Batch());

        if(batch.length > 0) {
            client.emit(batch.get());
        }
    }
}, 1000);



exports.init = function() {
	var connection = amqp.createConnection(config.rabbitmq);
    connection.setMaxListeners(0);

    //endAmqpConnection = function() {
        //connection.end();
    //};

	connection.on('ready', function () {

		connection.queue('debugServer', {'durable': true, autoDelete: false}, function(queue){

			// Receive messages
            queue.subscribe(function (message, header, type) {

                for(var i in clients) {
                    clients[i].getBatch().add(type.routingKey, message.data.toString());
                }

                //try {
                //    var key = type.routingKey;
                //    var value = JSON.parse(message.data.toString());
                //
                //    batch.add(type.routingKey, message.data.toString());
                //
                //    incoming(key, value);
                //} catch (e) {
                //    console.log(e);
                //}
			});
		});
	});
};


var Client = function(socket, batch) {

    this.id = socket.id;

    this.swapBatch = function(newBatch) {
        var oldBatch = batch;
        batch = newBatch;
        return oldBatch;
    }

    this.getBatch = function() {
        return batch;
    };

    this.emit = function(value) {
        socket.emit('log', value);
    };

};


var Batch = function() {

    var storage = {};
    this.length = 0;

    this.add = function(route, content) {

        try {
            var value = JSON.parse(content);
        }catch(e) {
            console.log(e);
            return;
        }

        this.length++;

        var hash = crypto.createHash('md5').update(content).digest('hex');

        if(typeof storage[route] === 'undefined') {
            storage[route] = {};
        }

        if(typeof storage[route][hash] === 'undefined') {
            storage[route][hash] = [];
        }

        storage[route][hash].push(value);
    }

    this.get = function() {
        return storage;
    }

}