var angular = require('./lib/angular');

var fooController = require('./lib/fooController');

var app = angular.module('strichliste', []);

fooController.install(app);