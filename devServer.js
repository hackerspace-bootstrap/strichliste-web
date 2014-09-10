var express = require('express');
var morgan = require('morgan');
var args = require('yargs').argv;
var figlet = require('figlet');

var PORT = args.port || 8081;

console.log(figlet.textSync('Strichliste-Web Dev'));

express()
    .use(morgan('short'))
    .use(express.static(__dirname + '/build'))
    .listen(PORT, function() {
        console.log('running on: ' + PORT);
    });