var util = require('util');

var angular = require('../../lib/angular');
var settings = require('../settings');

function UserService($http) {

    this.getUsers = function() {
        return $http.get(settings.server + '/user');
    };

    this.getUser = function(user_id) {
        return $http.get(settings.server + '/user/' + encodeURIComponent(user_id));
    };

    this.createUser = function(name) {
        return $http.put(settings.server + '/user', {name: name});
    };
}

module.exports.install = function (app) {
    app.service('userService', UserService);
};
