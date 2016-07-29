# 4. Dynamic pages and Socket.IO
Now we want to create dynamic page and communicate between frontend and backend via [http://Socket.io/](http://socket.io/).

## Setup
This step requires "Initial setup" from root folder's `readme.md` to be done and sources from "3. Browserify modules" folder.

## Dynamic page
So far our HTTP service only hosted static documents, like `index.html`, etc. Now we will add dynamic page, which will tell backend version to user.

Add following code to `service.js`:
```
// === Dynamic page ===
// Load our package definition as object
var packageInfo = require('./package.json');

// Generate dynamic page on GET request
app.get('/about.html', function(req, res) {
  var currentTime = new Date().toLocaleTimeString();
  res.send("<strong>" + packageInfo.name + "</strong><br />version: " + packageInfo.version + "<br />License: " + packageInfo.license + "<br />Backend local time: " + currentTime);
});
```
Run service and open [http://localhost:5000/about.html](http://localhost:5000/about.html) to see generated message. Refresh it few times to ensure that message is dynamically generated each time you're requesting the address.

## Communication between frontend and backend
Socket.IO has two flawors `socket.io` for Node.JS side and `socket.io-client` for the browser.
Install them both:
```
npm install --save socket.io
npm install --save socket.io-client
```

Add input text box, button and div for output to the `static/index.html` after `Hello world!`:
```
<!doctype html>
<div>
  <input id="input-user" value="write your message here"></input>
  <button id="button-send">Send to server</button><br />
  <div id="div-server-message">Server's response will appear here</div>
</div>
```

Add handlers to frontend's code in `index.js`:
```
// === Communication with server over Socket.IO
// Create connection
var io = require('socket.io-client').connect();

$( document ).ready(function() {
    // Send whatever we have in text box on button click
    $('#button-send').click(function() {
        var userText = $('#input-user').val();
        io.emit('user message', userText);
    });

    // Update output div on server message
    io.on('server message', function (data) {
        $('#div-server-message').html(data);
    });
});
```
Don't forget to bundle client code via `npm run-script build`.

Add backend code to `service.js`:
```
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
```
It uses `server` instance of HTTP server, we're already using for `express`.

Start backend now (_View -> Debug_, choose `Launch` from combobox and press `F5`) and open [http://localhost:5000/](http://localhost:5000/).