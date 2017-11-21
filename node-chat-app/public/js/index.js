// establish socket and log to client console
var socket = io();
socket.on('connect', function () {
  console.log('connected to server');
});
socket.on('disconnect', function () {
  console.log('disconnected from server');
});
