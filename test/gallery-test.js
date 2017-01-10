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
          done();
        });
      });
    });
  });
});
