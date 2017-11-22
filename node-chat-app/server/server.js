const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000; // for heroku

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // ---- emit to a single connection
  // socket.emit('newMessage', {
  //   from: 'myserver@example.com',
  //   text: 'New message from server',
  //   createdAt: 123
  // });

  // challenge
  // -- socket.emit from admin text='welcome to the chat app'
  // -- socket.broadcast.emit from admin text='new user joined'
  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'new user joined',
    createdAt: new Date().getTime()
  });

  // createMessage listener
  socket.on('createMessage', (message) => {
      console.log('createMessage', message);
      // emit to all connections
      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime()
      });

    // emit to everybody 'except' ourselves
              // socket.broadcast.emit('newMessage', {
              //   from: message.from,
              //   text: message.text,
              //   createdAt: new Date().getTime()
              // });

    });

  socket.on('disconnect', (socket) => {
    console.log('new user disconnected');
  });
});

server.listen(port, () => {
  console.log(`started up at port ${port}`);
});
