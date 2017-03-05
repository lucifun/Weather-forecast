angular.module('myapp.weather', []).controller('weatherInfoShowCtrl', ['$scope', '$http', 'appServ', function ($scope, $http, appServ) {

    $scope.$watch('countryId', function () {
        if ($scope.countryId) {
            $http.get('/getWeatherInfo?townID=' + $scope.countryId).success(function (data) {
                var info = data['value'][0]['weathers'],
                    tmpTemper = {
                        heightTemperature: [],
                        lowTemperature: []
                    }, tmpTime = [];

                for (var i in info) {
                    tmpTime.push(info[i]['date']);
                    tmpTemper.heightTemperature.push(info[i]['temp_day_c']);
                    tmpTemper.lowTemperature.push(info[i]['temp_night_c']);
                }
                $scope.isHide = false;
                appServ.creatDoubleCanv(tmpTime, tmpTemper);
            })
        }else {
            $scope.isHide = true;
        }

    })


}]);