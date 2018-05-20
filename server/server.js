const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New User Connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room name are required');
    }

    // To leave room socket.leave('Room name')
    socket.join(params.room);
    // Remove new user from previous room first (if exist)
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.emit emits an event to a single connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));

    // socket.broadcast.emit emits an event to a every connection except the socket from which event is coming from
    // Room Specific -> socket.broadcast.to('Room Name').emit()
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback()
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    // io.emit emits an event to a every connection
    // Room Specific io.to('Room Name').emit()
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lattitude, coords.longitude));
  })

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started on port ${port} `);
});