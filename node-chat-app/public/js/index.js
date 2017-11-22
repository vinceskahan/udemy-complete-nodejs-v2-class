// establish socket and log to client console
var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'me@example.com',
    text: 'createMessage from newMessage from client'
  });

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message',message);

});
