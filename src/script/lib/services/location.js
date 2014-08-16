var angular = require('../../lib/angular');

function LocationService($location) {

    this.gotoUser = function(user_id) {
        $location.path('/user/' + user_id);
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