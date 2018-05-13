var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Kamran',
    text: 'hey, Palash'
  });
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});

socket.on('disconnect', function() {
  console.log('Disconnected to server');
});

socket.on('newEmail', function(email) {
  console.log('New Email Recieved', email);
});