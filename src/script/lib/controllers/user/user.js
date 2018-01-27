angular
    .module('strichliste.user', [
        'ngRoute',
        'ui.bootstrap',
        'strichliste.filter.localtime',
        'strichliste.services.message',
        'strichliste.services.location',
        'strichliste.services.transaction',
        'strichliste.services.user',
        'strichliste.services.audio',
        'strichliste.services.serverSettings'
    ])

    .config(function($routeProvider) {
        $routeProvider.when('/user/:userId', {
            templateUrl: 'controllers/user/user.html',
            controller: 'UserController'
        })
    })

    .controller('UserController', function ($scope, $routeParams, $timeout, $modal,
                                            Message, Location, Transaction, User, Audio, ServerSettings) {

        var userId = $routeParams.userId;

        function loadUser(userId) {
            User
                .getUser(userId)
                .success(function (user) {
                    $scope.user = user;
                })
                .error(function (body, httpCode) {
                    if (httpCode == 404) {
                        return Message.error('userDoesNotExist');
                    }

                    return Message.httpError(body, httpCode);
                });
        }

        ServerSettings
            .getUserBoundaries()
            .then(function(result) {
                $scope.boundary = result;
            });

        $scope.backClick = function() {
            Location.gotoHome();
        };

        $scope.showAllClick = function() {
            Location.gotoTransactions(userId);
        };

        $scope.transferClick = function(value) {
            var modalInstance = $modal.open({
                templateUrl: 'modals/userTransfer/userTransfer.html',
                controller: 'userTransferController',
                resolve: {
                    value: function(){
                        return value;
                    },
                    comment: function(){
                        return 'Default transaction';
                    }
                }
            });
        }

        $scope.transactionClick = function(value) {

            if(settings.audio.transaction) {
                Audio.play(settings.audio.transaction);
            }

            var balanceElement = angular.element('.account-balance');
            balanceElement.addClass((value > 0)? 'change-positive' : 'change-negative');

            $scope.transactionRunning = true;
            $scope.user.balance += value;

            $timeout(function() {
                balanceElement.removeClass('change-positive change-negative');
                $scope.transactionRunning = false;
            }, 800);

            var comment = 'Default transaction';

            Transaction
                .createTransaction(userId, value, comment)
                .success(function() {
                    loadUser(userId);
                })
                .error(function(body, httpCode) {
                    if(httpCode == 403) {
                        return Message.error('userBoundaryReached');
                    }

                    return Message.httpError(body, httpCode);
                });
        };

        $scope.customTransactionClick = function(transactionMode) {

            var modalInstance = $modal.open({
                templateUrl: 'modals/customTransaction/customTransaction.html',
                controller: 'CustomTransactionController',
                resolve: {
                    transactionMode: function(){
                        return transactionMode;
                    }
                }
            });
        };

        if(settings.paymentSteps.customTransactions) {
            $scope.depositSteps = settings.paymentSteps.deposit.slice(0, 4);
            $scope.dispenseSteps = settings.paymentSteps.dispense.slice(0, 4);
            $scope.transferSteps = settings.paymentSteps.transfer.slice(0, 4);
            $scope.customTransactions = true;
        } else {
            $scope.depositSteps = settings.paymentSteps.deposit;
            $scope.dispenseSteps = settings.paymentSteps.dispense;
            $scope.transferSteps = settings.paymentSteps.transfer;
        }

        loadUser(userId);
    });
