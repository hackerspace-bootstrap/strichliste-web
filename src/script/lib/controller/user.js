var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, locationService, transactionService, userService) {

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.transactionClick = function(value) {
            transactionService.createTransaction($routeParams.user_id, value);
        };

        $scope.depositSteps = settings.paymentSteps.deposit;
        $scope.dispenseSteps = settings.paymentSteps.dispense;

        userService
            .getUser($routeParams.user_id)
            .success(function(user) {
                $scope.user = user;
            })
            .error(function() {
                alert("Something went wrong");
            });

    });
};