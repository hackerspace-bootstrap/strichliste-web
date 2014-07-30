var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, locationService, transactionService, userService) {


        function loadUser() {
            userService
                .getUser($routeParams.user_id)
                .success(function(user) {
                    $scope.user = user;
                })
                .error(function(response) {
                    alert(response.message);
                });
        }

        function loadTransactions() {
            transactionService
                .getTransactionByUserId($routeParams.user_id)
                .success(function(transactions) {
                    $scope.transactions = transactions;
                })
                .error(function(response) {
                    alert(response.message);
                });
        }

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.transactionClick = function(value) {
            transactionService
                .createTransaction($routeParams.user_id, value)
                .success(function() {
                    loadUser();
                    loadTransactions();
                })
                .error(function(response) {
                    alert(response.message);
                });
        };

        $scope.depositSteps = settings.paymentSteps.deposit;
        $scope.dispenseSteps = settings.paymentSteps.dispense;


        loadUser();
        loadTransactions();

    });
};