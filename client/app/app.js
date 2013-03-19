LiveLogger.App = angular.module('LiveLogger');

LiveLogger.App.config([
	'$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/templates/logs.html',
			controller: LiveLogger.Controller.LogsController
		});
	}
]);

LiveLogger.App.run([function () {

}]);