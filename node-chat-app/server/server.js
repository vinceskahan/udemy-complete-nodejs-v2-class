const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; // for heroku
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  // ---- emit to a single connection
  // socket.emit('newMessage', {
  //   from: 'myserver@example.com',
  //   text: 'New message from server',
  //   createdAt: 123
  // });

  // challenge
  // -- socket.emit from admin text='welcome to the chat app'
  // -- socket.broadcast.emit from admin text='new user joined'
 
  // createMessage listener
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');

    // emit to everybody 'except' ourselves
              // socket.broadcast.emit('newMessage', {
              //   from: message.from,
              //   text: message.text,
              //   createdAt: new Date().getTime()
              // });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

