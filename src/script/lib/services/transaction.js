var util = require('util');

var angular = require('../../lib/angular');
var settings = require('../settings');

function TransactionService($http) {

    this.getTransactionByUserId = function(user_id, offset, limit) {
        return $http.get(settings.server + '/user/' + user_id + '/transaction', {
            params: {
                limit: limit,
                offset: offset
            }
        });
    };

    this.createTransaction = function(user_id, value) {
        return $http.post(settings.server + '/user/' + user_id + '/transaction', {
            value: value
        });
    };
}

module.exports.install = function (app) {
    app.service('transactionService', TransactionService);
};