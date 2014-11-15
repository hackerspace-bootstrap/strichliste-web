var localtimeFilter = require('./localtime');

function install(app) {
    localtimeFilter.install(app);
}

module.exports.install = install;