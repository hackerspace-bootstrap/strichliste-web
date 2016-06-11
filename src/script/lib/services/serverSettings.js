angular
    .module('strichliste.services.serverSettings', [
        'strichliste.models.boundary',
        'strichliste.services.message'
    ])

    .factory('ServerSettings', function($q, $http, Boundary, Message) {

        var ACCOUNT_BOUNDARY_KEY = 'boundaries';

        function Settings() {
            this.settingsCache = false;
        }

        Settings.prototype.getUserBoundaries = function () {

            return this
                .getSettings()
                .then(function (settings) {
                    var boundary = Boundary(settings[ACCOUNT_BOUNDARY_KEY].lower, settings[ACCOUNT_BOUNDARY_KEY].upper);
                    return $q.resolve(boundary);
                });
        };

        Settings.prototype.getSettings = function () {

            var that = this;

            if (this.settingsCache) {
                return $q.resolve(this.settingsCache);
            }

            var deferred = $q.defer();

            $http
                .get(settings.server + '/settings')
                .success(function (response) {
                    that.settingsCache = response;
                    deferred.resolve(response);
                })
                .error(function (response) {
                    Message.error('errorLoadingSettings');
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        return new Settings();
    });