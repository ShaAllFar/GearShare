'use strict';

const PORT = 5000;
const server = require('http').createServer();
const io = require('socket.io').listen(server);
const crypto = require('crypto');
const users = {}; //TODO create function in message view to retrieve all users and populate this object literal.
const socks = {};
// require('./frontend/app/component/chat/chat.js');

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
  socket.on('join', (recv, fn) => {
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

    uid = new Uid();
    socket.user = recv.user;
    var my_avatar = get_avatar_url(socket.user);

    users[socket.user] = {'uid': Uid.lastid, 'user': socket.user, 'name': recv.name, 'status': 'online', 'avatar': my_avatar}
    socks[socket.user] = {'socket': socket}

    socket.broadcast.emit('chat', JSON.stringify( {'action': 'newuser', 'user': users[socket.user]} ));

    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'login': 'successful', 'my_settings': users[socket.user]} ));

  });

  socket.on('user_status', (recv) => {
    if (users[socket.user]) {
      users[socket.user].status = recv.status;
      socket.broadcast.emit('chat', JSON.stringify( {'action': 'user_status', 'user': users[socket.user]} ));
    }
  });

  socket.on('user_typing', (recv) => {
    var id = socks[recv.user].socket.id;
    io.sockets.socket(id).emit('chat', JSON.stringify( {'action': 'user_typing', 'data': users[socket.user]} ));
  });

  socket.on('message', (recv, fn) => {
    var d = new Date();
    var id = socks[recv.user].socket.id;
    var msg = {'msg': recv.msg, 'user': users[socket.user]};
    if (typeof fn !== 'undefined')
      fn(JSON.stringify( {'ack': 'true', 'date': d} ));
    io.sockets.socket(id).emit('chat', JSON.stringify( {'action': 'message', 'data': msg, 'date': d} ));
  });

  socket.on('disconnect', () => {
    if (users[socket.user]) {
      socket.broadcast.emit('chat', JSON.stringify( {'action': 'disconnect', 'user': users[socket.user]} ));
      delete users[socket.user];
      delete socks[socket.user];
    }
  });

});

server.listen(PORT, () => {
  var addr = server.address();
  console.log('chatroom listening on ' + addr.address + addr.PORT);
});

function get_avatar_url(user) {
  var mymd5 = crypto.createHash('md5').update(user);
  var rand = random(0, avatar_404.length);
  var end = '?d=' + avatar_404[rand];
  return avatar_url + mymd5.digest('hex') + '/' + end;
}

function random(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
