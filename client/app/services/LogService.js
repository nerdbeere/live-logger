angular.module('LiveLogger', [], function($provide) {
	$provide.factory('Log', ['$rootScope', function($rootScope) {

        var limit = 20;

		var logs = [];
        var keys = {};

		var socket = io.connect('http://127.0.0.1:3001');
		socket.on('log', function (data) {

            for(var key in data) {
                if(logs.length + 1 > limit) {
                    logs.splice(0, 1);
                }

                if(typeof keys[key] === 'undefined') {
                    var color = "#"+((1<<24)*Math.random()|0).toString(16);
                    keys[key] = color;
                }

                for(var hash in data[key]) {
                    var newData = {
                        hash: hash,
                        key: key,
                        data: data[key][hash][0],
                        count: data[key][hash].length,
                        color: keys[key]
                    };

                    logs.push(newData);
                    console.log(newData);
                }
            }

			if (!$rootScope.$$phase)
			{
				$rootScope.$apply();
			}
		});

		return {
			get: function() {
				return logs;
			},
            getKeys: function() {
                return keys;
            },
            getLimit: function() {
                return limit;
            },
            setLimit: function(showLimit) {
                return limit = showLimit;
            },
			endAmqpConnection: function() {
				socket.emit('endAmqpConnection');
			}
		}
	}]);
});