const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; // for heroku
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  // socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }

    socket.join(params.room);
    // how to leave
    //  socket.leave('your name here');

    // ways we've emitted before:
    //   io.emit - emits to all connected users
    //   socket.broadcast.emit - to all connected users except yourself
    //   socket.emit - to a specific user

    // we could more specifically emit to a specific room
    //  io.to(params.room).emit;
    //  socket.broadcast.to(params.room);

    // new user gets a welcome message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // users in that room (only) get message saying a user has joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
