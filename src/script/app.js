var angular = require('./lib/angular');

var indexController = require('./lib/controller/index');
var userController = require('./lib/controller/user');
var createUserController = require('./lib/controller/createUser');

var userService = require('./lib/services/user');
var locationService = require('./lib/services/location');
var transactionService = require('./lib/services/transaction');

var settings = require('./lib/settings');

var app = angular.module('strichliste', ['ngRoute', 'ngIdle'])
   .config(function ($routeProvider) {

       $routeProvider
           .when('/', {
               templateUrl: 'partials/index.html',
               controller: 'IndexController'
           })
           .when('/user/:user_id', {
               templateUrl: 'partials/user.html',
               controller: 'UserController'
           })
           .when('/createUser', {
               templateUrl: 'partials/createUser.html',
               controller: 'CreateUserController'
           })
           .otherwise({
               redirectTo: '/'
           });
   })
    .config(function ($idleProvider, $keepaliveProvider) {
        $idleProvider.idleDuration(settings.idleTimeout); // in seconds
        $idleProvider.warningDuration(0); // in seconds
        $keepaliveProvider.interval(2); // in seconds
    });

indexController.install(app);
userController.install(app);
createUserController.install(app);

userService.install(app);
locationService.install(app);
transactionService.install(app);
