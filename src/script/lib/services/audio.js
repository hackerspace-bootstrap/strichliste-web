var angular = require('../../lib/angular');

var AudioContext = (window.AudioContext || window.webkitAudioContext);
var context = null;

if(AudioContext) {
    context = new AudioContext();
}

function AudioService($http, messageService) {

    this.prefetchedAudioObjects = {};

    this.prefetch = function(filename) {

        if(!context) {
            return false;
        }

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

        if(!this.prefetchedAudioObjects[filename] || !context) {
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