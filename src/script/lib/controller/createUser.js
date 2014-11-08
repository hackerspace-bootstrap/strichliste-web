module.exports.install = function(app) {
    app.controller('CreateUserController', function ($scope, messageService, locationService, userService) {

        $scope.createUser = function() {
            userService
                .createUser($scope.name)
                .success(function() {
                    locationService.gotoHome();
                })
                .error(function(body, httpCode) {
                    if(httpCode == 409) {
                        return messageService.error('createUserExists', {name: $scope.name});
                    }

                    return messageService.httpError(body, httpCode);
                });
        };

    });
};