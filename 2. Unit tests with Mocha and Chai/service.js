// === HTTP service ===
var express = require('express');
var app = express();
var server = require('http').createServer(app);

// maps contents of /static folder to the site's root
app.use(express.static(__dirname + '/static')); 

// start listening 
server.listen(5000, function () {
  console.log('Example JS service is listening on http://localhost:5000');
});

// === Importing module on server side ===
var myModule = require('./my-module.js');

console.log('Square of 5 is ' + myModule.square(5));
console.log('Waiting one second');
myModule.waitOneSecond(function() {
  console.log('Waiting is over');
});