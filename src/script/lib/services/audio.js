var angular = require('../../lib/angular');

function AudioService() {

    this.prefetchedAudioObjects = {};

    this.prefetch = function(filename) {

        var audio = new Audio(filename);
        audio.preload = 'auto';

        this.prefetchedAudioObjects[filename] = audio;

        return audio;
    };

    this.getPrefetchedAudio = function(filename) {

        if(this.prefetchedAudioObjects[filename]) {
            return this.prefetchedAudioObjects[filename];
        }

        return false;
    };

    this.play = function(filename) {

        var audio = this.getPrefetchedAudio(filename);
        if(audio == false) {
            audio = this.prefetch(filename);
        }

        return audio.cloneNode().play();
    };

}

module.exports.install = function (app) {
    app.service('audioService', AudioService);
};