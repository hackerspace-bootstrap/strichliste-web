angular
    .module('strichliste.services.user', [])

    .factory('User', function($http) {

        function User() {
        }

        User.prototype.getUsers = function() {
            return $http.get(settings.server + '/user');
        };

        User.prototype.getUser = function(user_id) {
            return $http.get(settings.server + '/user/' + user_id);
        };

        User.prototype.createUser = function(name) {
            return $http.post(settings.server + '/user', {name: name});
        };

        return new User();
    });

