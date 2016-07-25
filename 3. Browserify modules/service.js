var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static')); // maps app contents of /static folder to http://localhost:5000

app.listen(5000, function () {
  console.log('Example JS service is listening on http://localhost:5000');
});

var myModule = require('./my-module.js');
console.log('Square of 5 is ' + myModule.square(5));

console.log('Waiting one second');
myModule.waitOneSecond(function() {
  console.log('Waiting is over');
});
