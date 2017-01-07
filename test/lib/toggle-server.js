'use strict';

const debug = require('debug')('gear-share:server-toggle');
const PORT = process.env.PORT;

module.exports = exports = {};

exports.serverOn = function(server,done){
  if(!server.isRunning){
    server.listen(PORT, err => {
      if(err) return done(err);
      server.isRunning = true;
      debug(`SERVER UP: ${PORT}`);
      done();
    });
    return;
  }
  done();
};

exports.serverOff = function(server,done){
  if(server.isRunning){
    server.close(err => {
      if(err) return done(err);
      server.isRunning = false;
      debug('SERVER DOWN');
      done();
    });
    return;
  }
  done();
};
