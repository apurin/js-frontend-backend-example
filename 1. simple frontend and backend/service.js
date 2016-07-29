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