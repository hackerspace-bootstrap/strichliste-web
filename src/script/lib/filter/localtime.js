var settings = require('../settings');
require('moment-timezone');

var moment = require('moment');

function localtimeFilter() {
    return function(input) {
        var result = moment.utc(input).local();

        if(settings.i18n.timezone != 'auto') {
            result.tz(settings.i18n.timezone);
        }

        return result.format(settings.i18n.dateFormat);
    };
}


module.exports.install = function (app) {
    app.filter('localtime', localtimeFilter);
};