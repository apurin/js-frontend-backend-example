# 4. Dynamic pages and Socket.IO
Now we want to create dynamic page and communicate between frontend and backend via [http://Socket.io/](http://socket.io/).

## Setup
This step requires "Initial setup" from root folder's `readme.md` to be done and sources from "3. Browserify modules" folder.

## Dynamic page
So far our HTTP service only hosted static documents, like `index.html`, etc. Now we will add dynamic page, which will tell backend version to user.

Update `service.js` script:
```
var express = require('express');
var app = express();
var packageInfo = require('./package.json');

app.use(express.static(__dirname + '/static')); // maps app contents of /static folder to http://localhost:5000

app.get('/about.html', function(req, res) {
  var currentTime = new Date().toLocaleTimeString();
  res.send("<strong>" + packageInfo.name + "</strong><br />version: " + packageInfo.version + "<br />License: " + packageInfo.license + "<br />Backend local time: " + currentTime);
});

app.listen(5000, function () {
  console.log('Example JS service is listening on http://localhost:5000');
});

var myModule = require('./my-module.js');
console.log('Square of 5 is ' + myModule.square(5));

console.log('Waiting one second');
myModule.waitOneSecond(function() {
  console.log('Waiting is over');
});
```
Run service and open [http://localhost:5000/about.html](http://localhost:5000/about.html) to see generated message. Refresh it few times to ensure that message is dynamically generated each time you're requesting the address.

## Communication between frontend and backend
Add "socket.io" to dependencies and run `npm install` to install it.

Add an input and button to `static/index.html`:
```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example JS service</title>
    <link rel="stylesheet" type="text/css" href="index.css"/>
</head>
<body>
    Hello world!
    <div>
        <input id="input-user" value="write your message here"></input>
        <button id="button-send">Send to server</button><br />
        <div id="div-server-message">Server's response will appear here</div>
    </div>
    <script src="bundle.js"></script>      
</body>
</html>
```

Add handlers to frontend's code in `index.js`:
```
$ = require('jquery');
var io = require('socket.io-client').connect('http://localhost:5000');

$( document ).ready(function() {
    $('body').append('<br />Updated by jQuery!');    

    $('#button-send').click(function() {
        var userText = $('#input-user').val();
        io.emit('user message', userText);
    });

    io.on('server message', function (data) {
        $('#div-server-message').html(data);
    });
});
```

And to backend code in `service.js`:
```
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
```