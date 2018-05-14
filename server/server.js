const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);

    // socket.emit emits an event to a single connection
    // io.emit emits an event to a every connection
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected to server');
  });
});



server.listen(port, () => {
  console.log(`Started on port ${port} `);
});