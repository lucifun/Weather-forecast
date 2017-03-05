angular.module('myapp.service', []).service('appServ', function () {
    this.creatCanv = function (time, temperature) {
        temperature.splice(-1,1,temperature[0]);
        var config = {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: "3小时区间平均气温(℃)",
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: temperature,
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true

                    }],
                    yAxes: [{
                        display: true
                    }]
                }
            }
        };
        document.getElementById('candiv').innerHTML = '<canvas id="canvas"></canvas>';
        var ctx = document.getElementById("canvas").getContext("2d")
        window.myLine = new Chart(ctx, config);
    };
    this.creatDoubleCanv = function (time, temperature) {
        var config = {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: "最高气温(℃)",
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: temperature.heightTemperature,
                    fill: false,
                },
                    {
                        label: "最低气温(℃)",
                        backgroundColor: window.chartColors.blue,
                        borderColor: window.chartColors.blue,
                        data: temperature.lowTemperature,
                        fill: false,
                    }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true

                    }],
                    yAxes: [{
                        display: true
                    }]
                }
            }
        };
        document.getElementById('candiv').innerHTML = '<canvas id="canvas"></canvas>';
        var ctx = document.getElementById("canvas").getContext("2d")
        window.myLine = new Chart(ctx, config);
    };
    this.creatData = function (data) {
        var dataList = {};
        var tempProvince = '', tempCity = ''
        for (var i in data) {
            if ((i - 0) % 1e4 === 0) {
                dataList[data[i]] = {};
                tempProvince = data[i];
                tempCity = '';
            } else if ((i - 0) % 1e2 === 0) {
                dataList[tempProvince][data[i]] = {};
                tempCity = data[i];
            } else {
                if (tempCity) {
                    dataList[tempProvince][tempCity][i] = data[i];
                } else {
                    dataList[tempProvince][i] = data[i];
                }
            }
        }
        return dataList;
    }

})