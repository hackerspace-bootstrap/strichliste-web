var angular = require('../../lib/angular');

var context = new (window.AudioContext || window.webkitAudioContext)();

function AudioService() {

    this.prefetchedAudioObjects = {};

    this.prefetch = function(filename) {

        var that = this;
        var request = new XMLHttpRequest();

        request.open("GET", filename, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
            context.decodeAudioData(request.response, function(buffer) {
                that.prefetchedAudioObjects[filename] = buffer;
            });
        };

        request.send();
    };

    this.play = function(filename) {
        var source = context.createBufferSource();

        source.buffer = this.prefetchedAudioObjects[filename];
        source.connect(context.destination);

        if(source.start) {
            source.start(0);
        } else {
            source.noteOn(0);
        }
    };
}

module.exports.install = function (app) {
    app.service('audioService', AudioService);
};