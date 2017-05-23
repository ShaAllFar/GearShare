'use strict';

// const net = require('net');
const EE = require('events');
const Client = require('./frontend/app/component/chat/chat.js');
const PORT = process.env.PORT || 5000;
// const server = net.createServer();
const ee = new EE();
const debug = require('gear-share:chat-server.js');

const allUsers = [];

ee.on('@dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  allUsers.forEach( c => {
    if (c.nicknmae === nickname) {
      c.socket.write(`${client.nicknmae}: ${message}\n`);
    }
  });
});

ee.on('@all', function(client, data) {
  allUsers.forEach( c => {
    c.socket.write(`${client.nickname}: ${data}`);
  });
});

ee.on('@nickname', function(client, data){
  client.nickname = data.trim();
  client.socket.write(`nickname is now: ${data}`);
});

ee.on('default', function(client) {
  client.socket.write('not a command');
});

server.on('connection', function(socket) {
  var user = new Client(socket);
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
    allUsers.forEach(function(client) {
      client.socket.write(`${user} is no longer connected.`);
    });
  });
});


const server = module.exports = server.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});
// server.listen(PORT, function() {
//   debug(`server live on: ${PORT}`);
// });
