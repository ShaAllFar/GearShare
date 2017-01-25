'use strict';

const net = require('net');
const EE = require('events');
const Chat = require('./model/chat.js');
const PORT = process.env.PORT || 3000;
const server = net.createServer();
const ee = new EE();

const allUsers = [];

ee.on('@dm', function(chat, string) {
  let message = string.split(' ').slice(1).join(' ').trim();

});

ee.on('default', function(chat) {
  chat.socket.write('not a command');
});

server.on('connection', function(socket) {
  var user = new Chat(socket);
  allUsers.push(user);

  console.log('connection successful');
  console.log('chat:', user.id);

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if(command.startsWith('@')) {
      ee.emit(command, user, data.toString().split(' ').slice(1).join(' '));
      return;
    }

    ee.emit('default', user, data.toString());
  });

  socket.on('error', function(err) {
    console.log(err);
  });

  socket.on('close', function() {
    allUsers.forEach(function(chat) {
      client.socket.write(`${user} is no longer connected.`);
    });
  });
});

server.listen(PORT, function() {
  console.log(`server live on: ${PORT}`);
});
