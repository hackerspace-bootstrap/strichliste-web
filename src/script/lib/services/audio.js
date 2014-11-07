var angular = require('../../lib/angular');

function AudioService() {

    this.createBufferdAudioObject = function(filename) {
        var audio = new Audio(filename);
        audio.preload = 'auto';

        return {
            play: function() {
                return audio.cloneNode().play();
            }
        };
    };

}

module.exports.install = function (app) {
    app.service('audioService', AudioService);
};