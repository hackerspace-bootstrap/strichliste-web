var settings = require('../settings');

function parseDateResponse(date) {
    var t = date.split(/[- :]/);
    return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
}

function isActiveUser(user) {

    if(user.lastTransaction === null) {
        return false;
    }

    return (parseDateResponse(user.lastTransaction).getTime() > (new Date().getTime()-settings.inactiveUserPeriod));
}

module.exports.install = function(app) {

    app.controller('IndexController', function ($scope, locationService, userService) {

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


        $scope.isActiveUser = isActiveUser;
        $scope.isInactiveUser = function(user) {
            return !isActiveUser(user);
        };
    });
};