var util = require('util');

var angular = require('../../lib/angular');
var settings = require('../settings');

function TransactionService($http) {

    this.getTransactionByUserId = function(user_id) {
        return $http.get(settings.server + '/user/' + user_id + '/transaction');
    };

    this.createTransaction = function(user_id, value) {
        return $http.put(settings.server + '/user/' + user_id + '/transaction', {
            value: value
        });
    };
}

module.exports.install = function (app) {
    app.service('transactionService', TransactionService);
};