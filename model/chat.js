'use strict';

const uuid = require('node-uuid');

const Chat = module.exports = function(socket) {
  this.socket = socket;
  this.user = user;
  this.id = uuid.v4();
}
