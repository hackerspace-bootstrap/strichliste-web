var ms = require('ms');

var app = angular
    .module('strichliste', [
        'ngRoute',
        'ngIdle',
        'pascalprecht.translate',
        'strichliste.services.audio',
        'strichliste.services.location',
        'strichliste.index',
        'strichliste.createUser',
        'strichliste.transaction',
        'strichliste.user',
        'strichliste.metrics',
        'strichliste.modals.customTransaction'
    ])

    .config(function ($routeProvider, $translateProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        $translateProvider
            .useSanitizeValueStrategy('escaped')
            .useMessageFormatInterpolation()
            .useStaticFilesLoader({
                prefix: 'locales/',
                suffix: '.json'
            })
            .fallbackLanguage('en');

        if(settings.i18n.preferredLanguage) {
            $translateProvider.preferredLanguage(settings.i18n.preferredLanguage)
        }

    })

    .controller('AppController', function() {
        // nothing there yet
    })

    .run(function(Audio) {
        angular.forEach(settings.audio, function(audio) {
            if(audio) {
                Audio.prefetch(audio);
            }
        });
    })

   .run(function($rootScope) {
         $rootScope.currency = settings.i18n.currency;
   });


if(settings.idleTimeout) {

    app
        .config(function(IdleProvider) {
            IdleProvider.idle(Math.ceil(ms(settings.idleTimeout)/1000));
            IdleProvider.timeout(false);
        })

        .run(function($rootScope, Idle, $location) {

            Idle.watch();

            $rootScope.$on('IdleStart', function() {
                if($location.path() != '/') {
                    $location.path('/');
                    $rootScope.$apply();
                }
            });

        });
}