// establish socket and log to client console
var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // create email event from client to server, with data after connect
  socket.emit('createEmail', {
    to: 'jen@example.com',
    text: 'createEmail from client'
  });

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// custom event from server to client
socket.on('newEmail', function (email) {
  console.log('New email',email);
});

socket.on('newMessage', function (message) {
  console.log('New message',message);
  socket.emit('createMessage', {
    to: 'me@example.com',
    text: 'createMessage from newMessage from client'
  });
});
