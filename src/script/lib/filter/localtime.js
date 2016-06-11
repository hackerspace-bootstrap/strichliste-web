require('moment-timezone');
var moment = require('moment');

angular
    .module('strichliste.filter.localtime', [])

    .filter('localtime', function localtimeFilter() {

        return function(input) {
            var result = moment.utc(input).local();

            if(settings.i18n.timezone != 'auto') {
                result.tz(settings.i18n.timezone);
            }

            return result.format(settings.i18n.dateFormat);
        };
    });