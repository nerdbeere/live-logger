LiveLogger.Controller.LogsController = function(Log, $scope) {
	$scope.logs = Log.get();
};