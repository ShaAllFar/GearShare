'use strict';

const PORT = process.env.PORT || 3000;
const server = require('http').createServer();
const io = require('socket.io').listen(server);
const crypto = require('crypto');
const users = {}; //TODO create function in message view to retrieve all users and populate this object literal.
const socks = {};

// const Chat = require('./model/chat.js');

var avatar_url = 'http://www.gravatar.com/avatar/';
var avatar_404 = ['mm', 'identicon', 'monsterid', 'wavatar', 'retro'];

function Uid() {
  this.id = ++Uid.lastid;
}

Uid.lastid = 0;

// Handle Users
io.sockets.on('connection', function(socket) {
  // Event recieved by new user
  socket.on('join', function(recv, fn) {
    if (!recv.user) {
      socket.emit('custom_error', { message: 'User not found or invalid'});
      return;
    }

    // User already logged on
    if (users[recv.user]) {
      socket.emit('custom_error', { message: 'User ' + recv.user + ' is already logged' });
      return;
    }

    if (Object.keys(users).length > 0)
      socket.emit('chat', JSON.stringify( { 'action': 'usrlist', 'user': users }));

    var uid = new Uid();
    socket.user = recv.user;
    var my_avatar = get_avatar_url(socket.user);

    users[socket.user] = {'uid': Uid.lastid, 'user': socket.user, 'name': recv.name, 'status': 'online', 'avatar': my_avatar}
    socks[socket.user] = {'socket': socket}

    socket.broadcast.emit('chat', JSON.stringify( {'action': 'newuser', 'user': users[socket.user]} ));

    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'login': 'successful', 'my_settings': users[socket.user]} ));

  });

  socket.on('user_status', function(recv) {

  })




})
