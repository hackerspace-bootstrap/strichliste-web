module.exports.install = function(app) {
    app.controller('CreateUserController', function ($scope, locationService, userService) {

        $scope.createUser = function() {
            userService
                .createUser($scope.name)
                .success(function() {
                    locationService.gotoHome();
                })
                .error(function() {
                    alert("Something went wrong");
                });
        };
    });
};