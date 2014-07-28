module.exports.install = function(app) {
    app.controller('IndexController', function ($scope, locationService, userService) {
        $scope.title = "These are the dudes";

        $scope.userClick = function(user_id) {
            locationService.gotoUser(user_id);
        };

        $scope.createUserClick = function() {
            locationService.gotoCreateUser();
        };

        userService.getUsers()
            .success(function(users) {
                $scope.users = users;
            })
            .error(function() {
                alert("Something went wrong");
            });
    });
};