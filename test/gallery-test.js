'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');
const testData = require('./lib/test-data.js');

const serverToggle = require('./lib/toggle-server.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

mongoose.Promise = Promise;

const exampleUser = testData.exampleUser;
const exampleGallery = testData.exampleGallery;

describe('Gallery Routes', function(){
  before(done => {
    serverToggle.serverOn(server,done);
  });
  after(done => {
    serverToggle.serverOff(server,done);
  })
  afterEach(done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({})
    ])
    .then(() => done())
    .catch(done);
  });
  describe('POST: /api/gallery', () => {
    describe('with a valid body', () => {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then(token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
      });
      it('should return a gallery', done => {
        request.post(`${url}/api/gallery`)
        .send(exampleGallery)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          let date = new Date(res.body.createdOn).toString();
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('example gallery');
          expect(res.body.desc).to.equal('example gallery description');
          done();
        });
      });
    });
    describe('with an invalid body', () => {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then(token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
      });
      it('should return a bad request', done => {
        request.post(`${url}/api/gallery`)
        .send({some: 'data', other: 'stuff'})
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          expect(res.status).to.equal(400);
          expect(res.body).to.equal(undefined);
          done();
        })
      });
    });
    describe('with an invalid route', () => {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then(token => {
          this.tempToken = token;
          done();
        })
        .catch(done)
      });
      it('should return not found', done => {
        request.post(`${url}/api/route`)
        .send(exampleUser)
        .set({
          Authorization: `Bearer `
        })
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        })
      })
    });
    describe('with no token provided', () => {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user => user.save())
        .then(user => {
          this.tempUser = user;
          done();
        })
        .catch(done);
      });
      it('should return unauthorized', done => {
        request.post(`${url}/api/gallery`)
        .send(exampleUser)
        .set({
          Authorization: 'Bearer '
        })
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        })
      })
    })
  });
});
