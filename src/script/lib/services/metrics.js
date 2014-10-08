var util = require('util');

var angular = require('../../lib/angular');
var settings = require('../settings');

function MetricsService($http) {

    this.getMetrics = function() {
        return $http.get(settings.server + '/metrics');
    };
}

module.exports.install = function (app) {
    app.service('metricsService', MetricsService);
};
