angular.module('myapp.temp', []).controller('myAppCtr', ['$scope', '$http', 'appServ', function ($scope, $http, appServ) {
    $scope.$watch('countryId', function () {
        if ($scope.countryId) {
            $http.get('/getWeatherInfo?townID=' + $scope.countryId).success(function (data) {
                var info = data['value'][0]['weatherDetailsInfo']['weather3HoursDetailsInfos'],
                    tmpTemper = [], tmpTime = [];

                for (var i in info) {
                    tmpTime.push(info[i]['startTime'].substring(info[i]['startTime'].length - 8, info[i]['startTime'].length - 3) + '~' + info[i]['endTime'].substring(info[i]['endTime'].length - 8, info[i]['endTime'].length - 3));
                    tmpTemper.push(info[i]['highestTemperature']);
                }

                appServ.creatCanv(tmpTime, tmpTemper);
            })
        }
    });


}]);