var express = require('express');
var app = express();
var packageInfo = require('./package.json');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(5000, function () {
  console.log('Server listening');
});

io.on('connection', function(socket){
  socket.on('user message', function (data) {
    socket.emit('server message', "Server recieved following data: <em>" + data + "</em>")
  });
});

app.use(express.static(__dirname + '/static')); // maps app contents of /static folder to http://localhost:5000

app.get('/about.html', function(req, res) {
  var currentTime = new Date().toLocaleTimeString();
  res.send("<strong>" + packageInfo.name + "</strong><br />version: " + packageInfo.version + "<br />License: " + packageInfo.license + "<br />Backend local time: " + currentTime);
});

var myModule = require('./my-module.js');
console.log('Square of 5 is ' + myModule.square(5));
console.log('Waiting one second');
myModule.waitOneSecond(function() {
  console.log('Waiting is over');
});

