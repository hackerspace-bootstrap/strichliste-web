var angular = require('../../lib/angular');
var settings = require('../settings');

var Boundary = require('../models/Boundary');

function SettingsService($q, $http) {

    var ACCOUNT_BOUNDARY_KEY = 'boundaries';

    this.settingsCache = false;

    this.getUserBoundaries = function() {

        var deferred = $q.defer();
        this.getSettings().then(function(settings) {
            var boundary = new Boundary(settings[ACCOUNT_BOUNDARY_KEY].lower, settings[ACCOUNT_BOUNDARY_KEY].upper);
            deferred.resolve(boundary);
        });

        return deferred.promise;
    };

    this.getSettings = function() {
        var that = this;
        var deferred = $q.defer();

        if(this.settingsCache === false) {
            $http
                .get(settings.server + '/settings')
                .success(function(response) {
                    that.settingsCache = response;
                    deferred.resolve(response);
                })
                .error(function(response) {
                    messageService.error('errorLoadingSettings');
                    $q.reject(response);
                });

        } else {
            deferred.resolve(this.settingsCache);
        }

        return deferred.promise;
    };

}

module.exports.install = function (app) {
    app.service('settingsService', SettingsService);
};