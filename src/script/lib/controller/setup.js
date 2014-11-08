var indexController = require('./index');
var userController = require('./user');
var createUserController = require('./createUser');
var transactionController = require('./transaction');
var metricsController = require('./metrics');

function install(app) {
    indexController.install(app);
    userController.install(app);
    createUserController.install(app);
    transactionController.install(app);
    metricsController.install(app);
}

module.exports.install = install;