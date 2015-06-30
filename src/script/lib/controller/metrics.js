var settings = require('../settings');

module.exports.install = function(app) {

    app.controller('MetricsController', function ($scope, $translate, metricsService, messageService) {

        metricsService
            .getMetrics()
            .success(function(metrics) {
                $scope.metrics = metrics;
                initChartData(metrics);
            })
            .error(function(body, httpCode) {
                return messageService.httpError(body, httpCode);
            });

        function formatNumber(num) {
            return Math.round(num * 100) / 100;
        }

        function initChartData(metrics) {

            var spent = [], income = [], labels = [], users = [], transactions = [];

            metrics.days.forEach(function(day, index) {
                spent.push(formatNumber(day.dayBalanceNegative*-1));
                income.push(formatNumber(day.dayBalancePositive));

                users.push(day.distinctUsers);
                transactions.push(day.overallNumber);

                labels.push(day.date);
            });

            $scope.payment = {
                labels: labels,
                series: ['Spent', 'Income'],
                colors: ['#d9230f', '#0fd948'],
                data: [spent, income]
            };

            $scope.activeUser = {
                labels: labels,
                series: ['Users'],
                colors: ['#ffa200'],
                data: [users]
            };

            $scope.transaction = {
                labels: labels,
                series: ['Transactions'],
                colors: ['#00a5ff'],
                data: [transactions]
            };
        }

        // Chart.js Options
        $scope.chartOptions =  {
            animation: false,
            maintainAspectRatio: false,
            responsive: true,

            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,

            barValueSpacing : 3,
            barDatasetSpacing : 2,

            barShowStroke : true,
            barStrokeWidth: 1
        };

    });
};
