module.exports.install = function(app) {
    app.controller('TransactionController', function ($scope, $routeParams, messageService, locationService, userService, transactionService) {

        var userNotFound = false;
        var entriesPerPage = 10;

        $scope.currentPage = 1;
        $scope.entriesPerPage = entriesPerPage;

        function loadTransactions(offset, limit) {

            transactionService
                .getTransactionByUserId($routeParams.user_id, offset, limit)
                .success(function(result) {
                    $scope.transactions = result.entries;
                    $scope.totalItems = result.overallCount;
                })
                .error(function(body, httpCode) {
                    if(httpCode == 404) {
                        // Handled in userService.getUser
                        return null;
                    }
                    return messageService.httpError(body, httpCode);
                });
        }

        userService
            .getUser($routeParams.user_id)
            .success(function(result) {
                $scope.user = result;
            })
            .error(function(body, httpCode) {
                if(httpCode == 404) {
                    userNotFound = true;
                    return messageService.error('userDoesNotExist');
                }

                return messageService.httpError(body, httpCode);
            });

        $scope.backClick = function() {
            if(userNotFound) {
                locationService.gotoHome();
            } else {
                locationService.gotoUser($routeParams.user_id);
            }
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function(currentPage) {
            loadTransactions((currentPage-1)*entriesPerPage, entriesPerPage);
        };

        loadTransactions(0, entriesPerPage);
    });
};