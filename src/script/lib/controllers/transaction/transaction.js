angular
    .module('strichliste.transaction', [
        'ngRoute',
        'strichliste.services.message',
        'strichliste.services.location',
        'strichliste.services.user',
        'strichliste.services.transaction'
    ])

    .config(function($routeProvider) {
        $routeProvider.when('/user/:userId/transaction', {
            templateUrl: 'controllers/transaction/transaction.html',
            controller: 'TransactionController'
        })
    })

    .controller('TransactionController', function ($scope, $routeParams,
                                                   Message, Location, User, Transaction) {

        var userNotFound = false;
        var entriesPerPage = 10;
        var userId = $routeParams.userId;

        $scope.currentPage = 1;
        $scope.entriesPerPage = entriesPerPage;

        function loadTransactions(offset, limit) {

            Transaction
                .getTransactionByUserId(userId, offset, limit)
                .success(function(result) {
                    $scope.transactions = result.entries;
                    $scope.totalItems = result.overallCount;
                })
                .error(function(body, httpCode) {
                    if(httpCode == 404) {
                        // Handled in userService.getUser
                        return null;
                    }
                    return Message.httpError(body, httpCode);
                });
        }

        User
            .getUser(userId)
            .success(function(result) {
                $scope.user = result;
            })
            .error(function(body, httpCode) {
                if(httpCode == 404) {
                    userNotFound = true;
                    return Message.error('userDoesNotExist');
                }

                return Message.httpError(body, httpCode);
            });

        $scope.backClick = function() {
            if(userNotFound) {
                Location.gotoHome();
            } else {
                Location.gotoUser(userId);
            }
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function(currentPage) {
            loadTransactions((currentPage - 1) * entriesPerPage, entriesPerPage);
        };

        loadTransactions(0, entriesPerPage);
    });