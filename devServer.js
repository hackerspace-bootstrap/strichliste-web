var express = require('express');
var args = require('yargs').argv;

var PORT = args.port || 8080;

express()
    .use(express.static(__dirname + '/build'))
    .listen(PORT);

console.log('running on: ' + PORT);