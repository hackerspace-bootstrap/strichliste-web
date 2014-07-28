module.exports.install = function(app) {
    app.controller('UserController', function ($scope, $routeParams, locationService, userService) {

        $scope.backClick = function() {
            locationService.gotoHome();
        };

        userService
            .getUser($routeParams.name)
            .success(function(user) {
                $scope.user = user;
            })
            .error(function() {
                alert("Something went wrng");
            });

    });
};