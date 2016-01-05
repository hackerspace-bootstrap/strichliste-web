var settings = require('../settings');

module.exports.install = function(app) {
    app.controller('CustomTransactionController', function ($scope, $rootScope, $routeParams, $modalInstance, $route,
                                                            $timeout,
                                                            locationService, messageService, audioService,
                                                            transactionService, transactionMode, settingsService,
                                                            userService) {

        var userId = $routeParams.user_id;

        // Because of some scope issues, we need to initialize the substructure
        $scope.transactionMode = transactionMode;

        $scope.cancel = function() {
            $modalInstance.close();
        };

        function normalizeDecimals(value) {
            return value.replace(',', '.');
        }

        function isValidNumber(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        }

        userService
            .getUser(userId)
            .success(function (user) {
                $scope.user = user;
            });

        settingsService.getUserBoundaries().then(function(result) {
            $scope.boundary = result;
        });

        $scope.submitTransaction = function(value) {

            if(settings.audio.transaction) {
                audioService.play(settings.audio.transaction);
            }

            value = normalizeDecimals(value);
            if(!isValidNumber(value)) {
                return messageService.error('customTransactionValueInvalid');
            }

            value = parseFloat(value).toFixed(2);

            if(value < 0.01) {
                return messageService.error('customTransactionValueTooSmall', {
                    currency: settings.i18n.currency
                });
            }

            // We can't pass value directly negated like in the UserController,
            // because we need to normalize the value first
            if(transactionMode == 'spend') {
                value *= -1;
            }

            transactionService
                .createTransaction(userId, value)
                .success(function() {
                    $modalInstance.close();
                    $route.reload();
                })
                .error(function(body, httpCode) {
                    if(httpCode == 403) {
                        return messageService.error('userBoundaryReached');
                    }

                    return messageService.httpError(body, httpCode);
                });
        };

        $timeout(function() {
            angular.element('input.transaction-value').focus();
        }, 400);


    });
};