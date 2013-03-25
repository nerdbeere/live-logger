LiveLogger.Controller.LogsController = function(Log, $scope) {
	$scope.keys = Log.getKeys();
	$scope.logs = Log.get();
    $scope.keyFilter = '';
};