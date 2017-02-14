'user strict';

const expect = require('chai').expect;
const request = require('superagent');

const mongoose = require('mongoose');
const server = require('../server.js');
const serverToggle = require('./lib/toggle-server.js');

const url = `http://localhost:${process.env.PORT}`;

describe('Server Test', function(){
  before(done => {
    serverToggle.serverOn(server,done);
  });
  after(done => {
    serverToggle.serverOff(server,done);
  });

  it('should return is running', done => {
    expect(server.isRunning).to.equal(true);
    done();
  });

  describe('root image', () => {
    it('should return root image url', done => {
      request.get(`${url}/`)
      .end((err,res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.header['content-type']).to.equal('image/png');
        done();
      });
    });
  });
});

describe('Database Test', function(){
  it('should return connection', done => {
    expect(mongoose.connection.port).to.be.a('number');
    expect(mongoose.connection.name).to.equal('gear-share');
    done();
  });
});
