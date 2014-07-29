var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, locationService, transactionService, userService) {

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.transactionClick = function(value) {
            transactionService
                .createTransaction($routeParams.user_id, value)
                .success(function() {
                    // Reload stuff?
                })
                .error(function(response) {
                    alert(response.message);
                });
        };

        $scope.depositSteps = settings.paymentSteps.deposit;
        $scope.dispenseSteps = settings.paymentSteps.dispense;

        userService
            .getUser($routeParams.user_id)
            .success(function(user) {
                $scope.user = user;
            })
            .error(function(response) {
                alert(response.message);
            });

    });
};