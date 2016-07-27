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