angular.module('LiveLogger', [], function($provide) {
	$provide.factory('Log', ['$rootScope', function($rootScope) {
		var logs = [];

		var socket = io.connect('http://127.0.0.1:3001');
		socket.on('log', function (data) {
			console.log(data);
			logs.push(data);
			if (!$rootScope.$$phase)
			{
				$rootScope.$apply();
			}
		});

		return {
			get: function() {
				return logs;
			}
		}
	}]);
});