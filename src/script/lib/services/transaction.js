var util = require('util');

var angular = require('../../lib/angular');

function TransactionService($http) {

    this.getTransactionByUserId = function(user_id) {
        return $http.get('http://rose:8080/user/' + user_id + '/transaction');
    };

    this.getUser = function(name) {
        return $http.get('http://rose:8080/user/' + encodeURIComponent(name));
    };

    this.addUser = function(name) {
        return $http.put('http://rose:8080/user', {
            name: name
        });
    };
}

module.exports.install = function (app) {
    app.service('transactionService', TransactionService);
};