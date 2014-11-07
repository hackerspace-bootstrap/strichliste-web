var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, $timeout, messageService, locationService,
                                               transactionService, userService, audioService) {

        var balanceElement = angular.element('.account-balance');

        function loadUser() {
            userService
                .getUser($routeParams.user_id)
                .success(function(user) {
                    $scope.user = user;
                })
                .error(function(body, httpCode) {
                    if(httpCode == 404) {
                        return messageService.error('userDoesNotExist');
                    }

                    return messageService.httpError(body, httpCode);
                });
        }

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.showAllClick = function() {
            locationService.gotoTransactions($routeParams.user_id);
        };

        $scope.transactionClick = function(value) {

            if(settings.audio.transaction) {
                audioService.play(settings.audio.transaction);
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
                .error(function(body, httpCode) {
                    if(httpCode == 403) {
                        return messageService.error('userBoundaryReached');
                    }

                    return messageService.httpError(body, httpCode);
                });
        };

        $scope.depositSteps = settings.paymentSteps.deposit;
        $scope.dispenseSteps = settings.paymentSteps.dispense;
        $scope.audio = settings.audio;


        loadUser();
    });
};