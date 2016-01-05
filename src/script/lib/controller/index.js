var settings = require('../settings');
var moment = require('moment');
var ms = require('ms');

function isActiveUser(user) {

    if(user.lastTransaction === null) {
        return false;
    }

    return (moment().diff(moment(user.lastTransaction)) < ms(settings.inactiveUserPeriod));
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
                $scope.users = users.entries;
            })
            .error(function(body, httpCode) {
                return messageService.httpError(body, httpCode);
            });

        $scope.isActiveUser = isActiveUser;
        $scope.isInactiveUser = function(user) {
            return !isActiveUser(user);
        };
    });
};