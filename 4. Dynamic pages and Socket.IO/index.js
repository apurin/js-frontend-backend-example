// === Import NPM jQuery module on the client side === 
$ = require('jquery');

$( document ).ready(function() {
    $('body').append('<br />Updated by jQuery!');
});

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