angular.module('myapp.route',['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'index-temp.html',
            controller:'myAppCtr'
        }).when('/weatherInfoShow', {
            templateUrl: 'weatherInfoShow.html',
            controller: 'weatherInfoShowCtrl'
        })
    }]);