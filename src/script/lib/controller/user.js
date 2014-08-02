var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, $idle, locationService, transactionService, userService) {


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

        $idle.watch();

        $scope.$on('$idleTimeout', function() {
            locationService.gotoHome();
        });

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.transactionClick = function(value) {
            transactionService
                .createTransaction($routeParams.user_id, value)
                .success(function() {
                    loadUser();
                })
                .error(function(response) {
                    alert(response.message);
                });
        };

        $scope.depositSteps = settings.paymentSteps.deposit;
        $scope.dispenseSteps = settings.paymentSteps.dispense;


        loadUser();
    });
};