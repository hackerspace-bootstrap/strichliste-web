angular
    .module('strichliste.services.location', [])

    .factory('Location', function ($location) {

        function Location() {
        }

        Location.prototype.gotoUser = function (userId) {
            $location.path('/user/' + userId);
        };

        Location.prototype.gotoCreateUser = function () {
            $location.path('/createUser');
        };

        Location.prototype.gotoHome = function () {
            $location.path('/');
        };

        Location.prototype.isHome = function() {
            return ($location.path() == '/');
        };

        Location.prototype.gotoTransactions = function (userId) {
            $location.path('/user/' + userId + '/transaction');
        };

        return new Location();
    });
