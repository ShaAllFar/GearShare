'user strict';

const expect = require('chai').expect;

const server = require('../server.js');
const mongoose = require('mongoose');

describe('Server Test', function(){
  it('should return is running', done => {
    expect(server.isRunning).to.equal(true);
    done();
  })
});

describe('Database Test', function(){
  it('should return connection', done => {
    expect(mongoose.connection.port).to.equal(57278);
    expect(mongoose.connection.name).to.equal('gear-share');
    done();
  })
})
