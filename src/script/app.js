var angular = require('./lib/angular');

var indexController = require('./lib/controller/index');
var userController = require('./lib/controller/user');
var createUserController = require('./lib/controller/createUser');
var transactionController = require('./lib/controller/transaction');
var metricsController = require('./lib/controller/metrics');

var userService = require('./lib/services/user');
var locationService = require('./lib/services/location');
var transactionService = require('./lib/services/transaction');
var messageService = require('./lib/services/message');
var metricsService = require('./lib/services/metrics');

var settings = require('./lib/settings');

var app = angular.module('strichliste', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'tc.chartjs'])
   .config(function ($routeProvider) {

       $routeProvider
           .when('/', {
               templateUrl: 'partials/index.html',
               controller: 'IndexController'
           })
           .when('/metrics', {
               templateUrl: 'partials/metrics.html',
               controller: 'MetricsController'
           })
           .when('/user/:user_id', {
               templateUrl: 'partials/user.html',
               controller: 'UserController'
           })
           .when('/createUser', {
               templateUrl: 'partials/createUser.html',
               controller: 'CreateUserController'
           })
           .when('/user/:user_id/transaction', {
               templateUrl: 'partials/transaction.html',
               controller: 'TransactionController'
           })
           .otherwise({
               redirectTo: '/'
           });
   })
   .config(function ($translateProvider) {

        $translateProvider
            .useSanitizeValueStrategy('escaped')
            .useStaticFilesLoader({
                prefix: 'locales/',
                suffix: '.json'
            })
            .fallbackLanguage('en');

        if(settings.preferredLanguage) {
            $translateProvider.preferredLanguage(settings.preferredLanguage)
        }

   })
   .run(function($rootScope) {
        $rootScope.currency = settings.currency;
   });

indexController.install(app);
userController.install(app);
createUserController.install(app);
transactionController.install(app);
metricsController.install(app);

userService.install(app);
locationService.install(app);
transactionService.install(app);
messageService.install(app);
metricsService.install(app);
