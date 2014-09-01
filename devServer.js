var express = require('express');
var args = require('yargs').argv;
var figlet = require('figlet');

var PORT = args.port || 8081;

console.log(figlet.textSync('Strichliste-Web Dev'));

express()
    .use(express.static(__dirname + '/build'))
    .listen(PORT, function() {
        console.log('running on: ' + PORT);
    });