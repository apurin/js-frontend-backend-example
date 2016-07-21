var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static')); // maps app contents of /static folder to http://localhost:5000

app.listen(5000, function () {
  console.log('Example JS service is listening on http://localhost:5000');
});