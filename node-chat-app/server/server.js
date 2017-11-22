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

  // createMessage listener
  socket.on('createMessage', (message) => {
      console.log('createMessage', message);
      // emit to all connections
      io.emit('newMessage', {
        from: message.from,
        text: message.text,
        createAt: new Date().getTime()
      });
    });

  socket.on('disconnect', (socket) => {
    console.log('new user disconnected');
  });
});

server.listen(port, () => {
  console.log(`started up at port ${port}`);
});
