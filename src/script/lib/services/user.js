var util = require('util');

var angular = require('../../lib/angular');

function UserService($http) {

    this.getUsers = function() {
        return $http.get('http://rose:8080/user');
    };

    this.getUser = function(user_id) {
        return $http.get('http://rose:8080/user/' + encodeURIComponent(user_id));
    };

    this.createUser = function(name) {
        return $http.put('http://rose:8080/user', {name: name});
    };
}

module.exports.install = function (app) {
    app.service('userService', UserService);
};
