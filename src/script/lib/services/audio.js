var angular = require('../../lib/angular');

var context = new (window.AudioContext || window.webkitAudioContext)();

function AudioService($http, messageService) {

    this.prefetchedAudioObjects = {};

    this.prefetch = function(filename) {

        var that = this;

        $http
            .get(filename, {
                responseType: 'arraybuffer'
            })
            .success(function(data) {
                context.decodeAudioData(data, function(buffer) {
                    that.prefetchedAudioObjects[filename] = buffer;
                });
            })
            .error(function() {
                messageService.error('errorLoadingAudio', {
                    filename: filename
                });
            });
    };

    this.play = function(filename) {

        if(!this.prefetchedAudioObjects[filename]) {
            return false;
        }
        
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