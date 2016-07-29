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

// === Dynamic page ===
// Load our package definition as an object
var packageInfo = require('./package.json');

// Generate dynamic page on GET request
app.get('/about.html', function(req, res) {
  var currentTime = new Date().toLocaleTimeString();
  res.send("<strong>" + packageInfo.name + "</strong><br />version: " + packageInfo.version + "<br />License: " + packageInfo.license + "<br />Backend local time: " + currentTime);
});

// === Communication with frontend via Socket.IO ===
var io = require('socket.io')(server);

// When client connects
io.on('connection', function(client){
  console.log("client connected: " + client.conn.remoteAddress);
  // Add handler for that client
  client.on('user message', function (data) {
    client.emit('server message', "Server received following data: <em>" + data + "</em>")
  });
});