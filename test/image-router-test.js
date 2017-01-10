'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const Image = require('../model/image.js');
const Post = require('../model/post.js');
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');

const serverToggle = require('./lib/toggle-server.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const testData = require('./lib/test-data.js');

describe('Image Routes', function() {
  before( done => {
    serverToggle.serverOn(server, done);
  });

  after( done => {
    serverToggle.serverOff(server, done);
  });

  afterEach( done => {
    Promise.all([
      Image.remove({}),
      Post.remove({}),
      User.remove({}),
      Gallery.remove({})
    ])
    .then( () => done())
    .catch(done);
  });

  describe('POST: /api/gallery/:postID/image', function() {
    describe('with a valid token and valid data', function() {
      before( done => {
        new User(testData.exampleUser)
        .generatePasswordHash(testData.exampleUser.password)
        .then( user => user.save())
        .then( user => {
          this.tempUser = user;
          return user.generateToken();
        })
        .then( token => {
          this.tempToken = token;
          done();
        })
        .catch(done);
      });

      before( done => {
        testData.userID = this.tempUser._id.toString();
        new Gallery(testData.exampleGallery).save()
        .then( gallery => {
          this.tempGallery = gallery;
          done();
        })
        .catch(done);
      });

      after( done => {
        delete testData.userID;
        done();
      });

      it.only('should return an image', done => {
        request.post(`${url}/api/gallery/${this.tempPost._id}/image`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .field('name', testData.name)
        .field('desc', testData.desc)
        .attach('image', testData.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(testData.name);
          expect(res.body.desc).to.equal(testData.desc);
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          expect(res.body.postID).to.equal(this.tempPost._id.toString());
          done();
        });
      });
    });
  });
  describe('DELETE: api/image/:imageID', function () {
    describe('with a valid image id', function() {
      it('should delete and return a 204', done => {
        request.delete(`${url}/api/image/${this.tempImage._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.staus).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
  });


});
