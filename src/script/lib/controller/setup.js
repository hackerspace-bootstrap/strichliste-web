var indexController = require('./index');
var userController = require('./user');
var createUserController = require('./createUser');
var transactionController = require('./transaction');
var metricsController = require('./metrics');
var customTransactionController = require('./customTransaction');

function install(app) {
    indexController.install(app);
    userController.install(app);
    createUserController.install(app);
    transactionController.install(app);
    metricsController.install(app);
    customTransactionController.install(app);
}

module.exports.install = install;