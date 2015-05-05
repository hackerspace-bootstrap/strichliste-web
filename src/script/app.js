var angular = require('./lib/angular');
var controllerSetup = require('./lib/controller/setup');
var serviceSetup = require('./lib/services/setup');
var filterSetup = require('./lib/filter/setup');

var settings = require('./lib/settings');

var app = angular.module('strichliste', ['ngRoute', 'ngIdle', 'pascalprecht.translate', 'ui.bootstrap', 'tc.chartjs'])

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

        if(settings.i18n.preferredLanguage) {
            $translateProvider.preferredLanguage(settings.i18n.preferredLanguage)
        }

    })

    .run(function(audioService) {
        angular.forEach(settings.audio, function(audio) {
            if(audio) {
                audioService.prefetch(audio);
            }
        });
    })

   .run(function($rootScope) {
         $rootScope.currency = settings.i18n.currency;
   });


if(settings.idleTimeout) {
    app
        .config(function(IdleProvider) {
            IdleProvider.idle(Math.ceil(settings.idleTimeout/1000));
            IdleProvider.timeout(false);
        })
        .run(function($rootScope, Idle, $location, locationService) {

            Idle.watch();

            $rootScope.$on('IdleStart', function() {
                console.log("IdleStart");

                if($location.path() != '/') {
                    locationService.gotoHome();
                }
            });

        });
}

controllerSetup.install(app);
serviceSetup.install(app);
filterSetup.install(app);