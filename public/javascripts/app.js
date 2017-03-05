angular.module('myapp', ['myapp.temp', 'myapp.route', 'myapp.service', 'myapp.weather'])
    .controller('myAppController', ['$scope', '$http', 'appServ', function ($scope, $http, appServ) {
        var dataList = {};
        var getTownId = function (proName, cityName, townName) {
            var countryId = 0;
            $scope.isHide = false;
            $scope.countryId = 0;
            if (townName.length > 2) {
                townName = townName.substring(0, townName.length - 1);
            }
            if (cityName && cityName.length > 2) {
                cityName = cityName.substring(0, cityName.length - 1);
            }
            if (proName.length > 2) {
                proName = proName.substring(0, proName.length - 1);
            }

            $http.get('CenterWeatherCityCode.json').success(function (data) {
                for (var i in data) {
                    if (townName === data[i]["countyname"] || cityName === data[i]["countyname"] || proName === data[i]["countyname"]) {
                        countryId = data[i]['areaid'];
                    }
                }
                $scope.countryId = countryId;
            });
        }


        $http.get('http://passer-by.com/data_location/list.json').success(function (data) {
            dataList = appServ.creatData(data);
        })
        // pro事件监听
        $scope.$watch('proNames', function () {
            $scope.cityNameIdArray = [];
            $scope.townNameIdArray = [];
            $scope.proNameIdArray = [];
            $scope.cityNames = '';
            $scope.townNames = '';
            $scope.cityIsHide = false;


            // 将匹配合适数据加入数组
            for (var i in dataList) {
                if ((i.indexOf($scope.proNames) === 0) && $scope.proNames) {
                    $scope.proNameIdArray.push(i);
                }
            }

            if (dataList[$scope.proNames]) {
                for (var i in dataList[$scope.proNames]) {
                    if (/[0-9]/.test(i)) {
                        $scope.townNameIdArray.push(dataList[$scope.proNames][i]);
                        $scope.cityIsHide = true;
                    } else {
                        $scope.cityNameIdArray.push(i);
                        if (dataList[$scope.proNames] && dataList[$scope.proNames][$scope.cityNames]) {
                            for (var i in dataList[$scope.proNames][$scope.cityNames]) {
                                $scope.townNameIdArray.push(dataList[$scope.proNames][$scope.cityNames][i]);
                            }
                        }
                    }

                }
            }


        });

        // city事件监听
        $scope.$watch('cityNames', function () {
            $scope.cityNameIdArray = [];
            $scope.townNameIdArray = [];
            $scope.townNames = '';
            $scope.isHide = true;

            if (dataList[$scope.proNames]) {
                for (var i in dataList[$scope.proNames]) {
                    if (i.indexOf($scope.cityNames) === 0) {
                        $scope.cityNameIdArray.push(i);
                        if (dataList[$scope.proNames] && dataList[$scope.proNames][$scope.cityNames]) {
                            for (var i in dataList[$scope.proNames][$scope.cityNames]) {
                                $scope.townNameIdArray.push(dataList[$scope.proNames][$scope.cityNames][i]);
                            }
                        }

                    }
                }


            }
        });

        //towns事件监听
        $scope.$watch('townNames', function () {
            $scope.isHide = true;
            $scope.townNameIdArray = [];
            if (!$scope.cityIsHide && dataList[$scope.proNames] && dataList[$scope.proNames][$scope.cityNames]) {
                for (var i in dataList[$scope.proNames][$scope.cityNames]) {
                    if (dataList[$scope.proNames][$scope.cityNames][i].indexOf($scope.townNames) === 0) {
                        $scope.townNameIdArray.push(dataList[$scope.proNames][$scope.cityNames][i]);
                        if (dataList[$scope.proNames][$scope.cityNames][i] === $scope.townNames) {
                             getTownId($scope.cityNames, $scope.cityNames, $scope.townNames);
                        }
                    }
                }
            } else if ($scope.cityIsHide && dataList[$scope.proNames]) {
                for (var i in dataList[$scope.proNames]) {
                    if (dataList[$scope.proNames][i].indexOf($scope.townNames) === 0) {
                        $scope.townNameIdArray.push(dataList[$scope.proNames][i]);
                        if (dataList[$scope.proNames][i] === $scope.townNames) {
                            getTownId($scope.cityNames, $scope.cityNames, $scope.townNames);
                        }
                    }
                }

            }

        });
    }]);