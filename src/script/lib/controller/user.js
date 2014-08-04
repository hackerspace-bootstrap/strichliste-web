var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, $timeout, locationService, transactionService, userService) {

        var balanceElement = angular.element('.account-balance');

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

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.transactionClick = function(value) {

            if(settings.audio.transaction) {
                angular.element('#transactionAudioElement')[0].play();
            }

            balanceElement.addClass((value > 0)? 'change-positive' : 'change-negative');

            $timeout(function() {
                balanceElement.removeClass('change-positive change-negative');
            }, 800);

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
        $scope.audio = settings.audio;


        loadUser();
    });
};