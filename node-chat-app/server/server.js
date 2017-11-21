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

// register listener
io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('disconnect', (socket) => {
    console.log('new user disconnected');
  });
});

server.listen(port, () => {
  console.log(`started up at port ${port}`);
});
