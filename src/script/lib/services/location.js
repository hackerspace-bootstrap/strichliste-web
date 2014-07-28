var angular = require('../../lib/angular');

function LocationService($location) {

    this.gotoUser = function(name) {
        $location.path('/user/' + name);
    };

    this.gotoCreateUser = function() {
        $location.path('/createUser');
    };

    this.gotoHome = function() {
        $location.path('/');
    }
}

module.exports.install = function (app) {
    app.service('locationService', LocationService);
};