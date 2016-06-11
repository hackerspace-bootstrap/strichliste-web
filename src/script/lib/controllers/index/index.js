var moment = require('moment');
var ms = require('ms');

function isActiveUser(user) {

    if (user.lastTransaction === null) {
        return false;
    }

    return (moment().diff(moment(user.lastTransaction)) < ms(settings.inactiveUserPeriod));
}

angular
    .module('strichliste.index', [
        'ngRoute',
        'strichliste.services.location',
        'strichliste.services.user',
        'strichliste.services.message'
    ])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'controllers/index/index.html',
            controller: 'IndexController'
        })
    })

    .controller('IndexController', function ($scope, Location, User, Message) {

        $scope.userClick = function (userId) {
            Location.gotoUser(userId);
        };

        $scope.createUserClick = function () {
            Location.gotoCreateUser();
        };

        User.getUsers()
            .success(function (users) {
                $scope.users = users.entries;
            })
            .error(function (body, httpCode) {
                return Message.httpError(body, httpCode);
            });

        $scope.isActiveUser = isActiveUser;
        $scope.isInactiveUser = function (user) {
            return !isActiveUser(user);
        };

    });