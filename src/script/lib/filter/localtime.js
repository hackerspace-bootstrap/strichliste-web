var settings = require('../settings');
var moment = require('moment');

function localtimeFilter() {
    return function(input) {
        return moment.utc(input).local().format(settings.i18n.dateFormat);
    };
}


module.exports.install = function (app) {
    app.filter('localtime', localtimeFilter);
};