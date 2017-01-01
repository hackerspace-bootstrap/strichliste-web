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

        $scope.activeUsers = [];
        $scope.inactiveUsers = [];

        if (settings.index && settings.index.tabbed) {
            $scope.mode = {
                tabbed: true,
                currentTab: 'active'
            };
        }

        $scope.userClick = function (userId) {
            Location.gotoUser(userId);
        };

        $scope.createUserClick = function () {
            Location.gotoCreateUser();
        };

        User.getUsers()
            .success(function (users) {
                $scope.activeUsers = users.entries.filter(isActiveUser);
                $scope.inactiveUsers = users.entries.filter(function(user) {
                    return !isActiveUser(user);
                });
            })
            .error(function (body, httpCode) {
                return Message.httpError(body, httpCode);
            });

    });