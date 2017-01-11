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
  afterEach(done => {
    Promise.all([
      User.remove({})
    ])
    .then(() => done())
    .catch(done);
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
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with an unregistered route', () => {
      it('should return a 404 error', done => {
        request.post(`${url}/api/unregistered-route`)
        .send(exampleUser)
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('with invalid username', function() {
      it('should throw a 400 error', done => {
        request.post(`${url}/api/signup`)
        .send({
          password: exampleUser.password,
          email: exampleUser.email,
          profileImageURI: exampleUser.profileImageURI,
          location:  exampleUser.location
        })
        .end( (err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('with an invalid email', function() {
      it('should throw a 400 error', done => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          password: exampleUser.password,
          profileImageURI: exampleUser.profileImageURI,
          location:  exampleUser.location
        })
        .end( (err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('with an invalid password', function() {
      it('should throw a 400 error', done => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          email: exampleUser.email,
          profileImageURI: exampleUser.profileImageURI,
          location:  exampleUser.location
        })
        .end( (err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('with an invalid profileImageURI', function() {
      it('should throw a 400 error', done => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          email: exampleUser.email,
          password: exampleUser.password,
          location:  exampleUser.location
        })
        .end( (err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('with an ivalid location', function() {
      it('should throw a 400 error', done => {
        request.post(`${url}/api/signup`)
        .send({
          username: exampleUser.username,
          email: exampleUser.email,
          password: exampleUser.password,
          profileImageURI: exampleUser.profileImageURI,
        })
        .end( (err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('GET: /api/signin', function() {
    before(done => {
      let user = new User(exampleUser);
      user.generatePasswordHash(exampleUser.password)
      .then(user => user.save())
      .then(user => {
        this.tempUser = user;
        done();
      })
      .catch(done);
    });

    after(done => {
      User.remove({})
      .then(() => done())
      .catch(done);
    });

    describe('with a valid/authenticated user', () => {
      it('should return a token', done => {
        request.get(`${url}/api/signin`)
        .auth('example name', '1234')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.be.a('string');
          done();
        });
      });
    });

    describe('with an invalid password/unauthenticated user', () => {
      it('should return a 401 error', done => {
        request.get(`${url}/api/signin`)
        .auth('example name', '37654')
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with an invalid username/unauthenticated user', () => {
      it('should return a 401 error', done => {
        request.get(`${url}/api/signin`)
        .auth('', '1234')
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(401);
          done();
        });
      });
    });

    describe('with an unregistered route', () => {
      it('should return a 404 error', done => {
        request.get(`${url}/api/unregistered-route`)
        .auth('example name', '1234')
        .end((err, res) => {
          expect(err).to.be.an('error');
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
