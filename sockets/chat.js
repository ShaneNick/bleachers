module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('User has Connected ' + socket.id);
  
      socket.on('message', (data) => {
        console.log('Message received:', data);
        socket.broadcast.emit('message', data);
      });
  
      socket.on('disconnect', () => {
        console.log('User has Disconnected');
      });
    });
  };
  