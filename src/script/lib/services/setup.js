var userService = require('./user');
var locationService = require('./location');
var transactionService = require('./transaction');
var messageService = require('./message');
var metricsService = require('./metrics');
var audioService = require('./audio');

function install(app) {
    userService.install(app);
    locationService.install(app);
    transactionService.install(app);
    messageService.install(app);
    metricsService.install(app);
    audioService.install(app);
}

module.exports.install = install;