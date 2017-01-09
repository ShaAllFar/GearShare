'user strict';

const expect = require('chai').expect;

const mongoose = require('mongoose');
const server = require('../server.js');

describe('Server Test', function(){
  it('should return is running', done => {
    expect(server.isRunning).to.equal(true);
    done();
  });
});

describe('Database Test', function(){
  it('should return connection', done => {
    expect(mongoose.connection.port).to.be.a('number');
    expect(mongoose.connection.name).to.equal('gear-share');
    done();
  });
});
