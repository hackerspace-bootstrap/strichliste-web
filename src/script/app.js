var angular = require('./lib/angular');

var indexController = require('./lib/controller/index');
var userController = require('./lib/controller/user');
var createUserController = require('./lib/controller/createUser');

var userService = require('./lib/services/user');
var locationService = require('./lib/services/location');

var app = angular.module('strichliste', ['ngRoute'])
   .config(function ($routeProvider) {

       $routeProvider
           .when('/', {
               templateUrl: 'partials/index.html',
               controller: 'IndexController'
           })
           .when('/user/:name', {
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
   });

indexController.install(app);
userController.install(app);
createUserController.install(app);

userService.install(app);
locationService.install(app);
