angular
    .module('strichliste.services.metrics', [])

    .factory('Metrics', function($http) {

        function Metrics() {
        }

        Metrics.prototype.getMetrics = function() {
            return $http.get(settings.server + '/metrics');
        };

        return new Metrics();

    });