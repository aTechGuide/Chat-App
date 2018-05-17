const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

  // socket.emit emits an event to a single connection
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

  // socket.broadcast.emit emits an event to a every connection except the socket from which event is coming from
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // io.emit emits an event to a every connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lattitude, coords.longitude));
  })

  socket.on('disconnect', () => {
    console.log('Disconnected to server');
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port} `);
});