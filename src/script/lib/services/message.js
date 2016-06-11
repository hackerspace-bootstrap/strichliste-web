
angular
    .module('strichliste.services.message', [
        'pascalprecht.translate'
    ])

    .factory('Message', function($rootScope, $translate) {

        function Message() {

            $rootScope.alerts = [];
            this._$rootScope = $rootScope;
            this._$translate = $translate;

            var that = this;

            $rootScope.$on('$routeChangeStart', function () {
                that._$rootScope.alerts = [];
            });
        }

        Message.prototype.httpError = function (body, httpCode) {
            this.error('uncaughtError', {
                message: "HTTP " + httpCode + " - " + body.message
            });
        };

        Message.prototype.error = function (message, variableReplacements) {
            this._write('danger', message, variableReplacements);
        };

        Message.prototype.info = function (message, variableReplacements) {
            this._write('info', message, variableReplacements);
        };

        Message.prototype.ok = function (message, variableReplacements) {
            this._write('success', message, variableReplacements);
        };

        Message.prototype._write = function (type, message, variableReplacements) {

            var that = this;

            this._$translate(message, variableReplacements || {}).then(function (translation) {
                that._$rootScope.alerts.push({type: type, msg: translation});
            });
        };

        return new Message();
    });
