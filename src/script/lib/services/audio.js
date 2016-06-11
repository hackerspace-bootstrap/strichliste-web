
angular
    .module('strichliste.services.audio', [
        'strichliste.services.message'
    ])

    .factory('Audio', function($http, Message) {

        var AudioContext = (window.AudioContext || window.webkitAudioContext);
        var context = null;

        if(AudioContext) {
            context = new AudioContext();
        }

        function Audio() {
            this.prefetchedAudioObjects = {};
        }

        Audio.prototype.prefetch = function(filename) {

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
                    Message.error('errorLoadingAudio', {
                        filename: filename
                    });
                });
        };

        Audio.prototype.play = function(filename) {

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

        return new Audio();

    });