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

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        $scope.transactionClick = function(value) {

            if(settings.audio.transaction) {
                angular.element('#transactionAudioElement')[0].play();
            }

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