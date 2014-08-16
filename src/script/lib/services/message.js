var angular = require('../../lib/angular');

function MessageService($rootScope, $translate) {

    $rootScope.alerts = [];
    this._$rootScope = $rootScope;
    this._$translate = $translate;

    var that = this;
    $rootScope.$on('$routeChangeStart', function() {
        that._$rootScope.alerts = [];
    });
}

MessageService.prototype.httpError = function(body, httpCode) {
    this.error('uncaughtError', {
        message: "HTTP " + httpCode + " - " + body.message
    });
};

MessageService.prototype.error = function(message, variableReplacements) {
    this._write('danger', message, variableReplacements);
};

MessageService.prototype.info = function(message, variableReplacements) {
    this._write('info', message, variableReplacements);
};

MessageService.prototype.ok = function(message, variableReplacements) {
    this._write('success', message, variableReplacements);
};

MessageService.prototype._write = function(type, message, variableReplacements) {

    var that = this;

    this._$translate(message, variableReplacements || {}).then(function (translation) {
        that._$rootScope.alerts.push({type: type, msg: translation});
    });
};

module.exports.install = function(app) {
    app.service('messageService', MessageService);
};