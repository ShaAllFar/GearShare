'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const serverToggle = require('./lib/toggle-server.js');
const User = require('../model/user.js');

mongoose.Promise = Promise;

const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const testData = require('./lib/test-data.js');

const exampleUser = testData.exampleUser;

describe('Auth Routes', function() {
  before(done => {
    serverToggle.serverOn(server, done);
  });

  after(done => {
    serverToggle.serverOff(server, done);
  });

  describe('POST: /api/signup', function() {
    describe('with a valid body', function() {
      after(done => {
        User.remove({})
        .then(() => done())
        .catch(done);
      });

      it('should return a token', done => {
        request.post(`${url}/api/signup`)
        .send(exampleUser)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });

    describe('with an invalid body', () => {
      it('should return a 400 error', done => {
        request.post(`${url}/api/signup`)
        .send({username: 'invalid user'})
        .end(res => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with an unregistered route', () => {
      it('should return a 404 error', done => {
        request.post(`${url}/api/unregistered-route`)
        .send(exampleUser)
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });


});
