var io = require('socket.io').listen(3001);
var emit = function() { };

io.sockets.on('connection', function (socket) {
	emit = function(key, value) {
		console.log(key, value);
		socket.emit('log', { key: key, value: value });
	}
});

exports.incoming = function(key, value){
	emit(key, value);
};