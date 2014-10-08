var settings = require('../settings');

module.exports.install = function(app) {

    app.controller('MetricsController', function ($scope, $translate, metricsService, messageService) {

        metricsService
            .getMetrics()
            .success(function(metrics) {
                $scope.metrics = metrics;
                console.log(metrics);
                initChartData(metrics);
            })
            .error(function(body, httpCode) {
                return messageService.httpError(body, httpCode);
            });

        function initChartData(metrics) {

            var spent = [], income = [], labels = [], users = [], transactions = [];

            metrics.days.forEach(function(day, index) {
                spent.push(day.dayBalanceNegative*-1);
                income.push(day.dayBalancePositive);
                users.push(day.distinctUsers);
                transactions.push(day.overallNumber);
                labels.push(day.date);
            });

            $scope.paymentData = {
                labels: labels,
                datasets: [
                    { label: 'Spent', fillColor: 'rgba(217,35,15,0.8)', data: spent },
                    { label: 'Income', fillColor: 'rgba(15,217,72,0.8)', data: income }
                ]
            };

            $scope.activeUserData = {
                labels: labels,
                datasets: [
                    { label: 'Users', fillColor: 'rgba(255,162,0,0.8)', data: users }
                ]
            };

            $scope.transactionData = {
                labels: labels,
                datasets: [
                    { label: 'Transactions', fillColor: 'rgba(0,156,255,0.8)', data: transactions }
                ]
            };
        }

        // Chart.js Options
        var chartOptions =  {
            animation: false,
            maintainAspectRatio: false,
            responsive: true,

            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,

            barValueSpacing : 3,
            barDatasetSpacing : 2,

            barShowStroke : false,

            scaleLabel: "<%=value%> " + settings.currency
        };


        $scope.paymentOptions = chartOptions;

        // This tmp-replace is a small "hack", because one can't deactivate the XSS-prevention for the
        // $translate service call once

        $translate('metricsActiveUserLabel', {number: 'tmp'}).then(function (result) {
            $scope.activeUserOptions = angular.extend(angular.copy(chartOptions), {
                scaleLabel: result.replace('tmp', '<%=value%>')
            });
        });

        $translate('metricsTransactionLabel', {number: 'tmp'}).then(function (result) {
            $scope.transactionOptions = angular.extend(angular.copy(chartOptions), {
                scaleLabel: result.replace('tmp', '<%=value%>')
            });
        });
    });
};
