angular.module('LiveLogger').
    filter('pretty', function() {
        return function(input) {
            return JSON.stringify(input, null, 4);
        }
    });