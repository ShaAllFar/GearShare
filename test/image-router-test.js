'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const Image = require('../model/image.js');
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');
const Post = require('../model/post.js');
const testData = require('./lib/test-data.js');

const serverToggle = require('./lib/toggle-server.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = testData.exampleUser;
const exampleGallery = testData.exampleGallery;
const exampleImage = testData.exampleImage;
const examplePost = testData.examplePost;

let imageData = {};

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

  describe('POST: /api/gallery/:postID/image', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
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
      exampleGallery.userID = this.tempUser._id.toString();
      new Gallery(exampleGallery).save()
      .then( gallery => {
        this.tempGallery = gallery;
        done();
      })
      .catch(done);
    });

    before( done => {
      examplePost.userID = this.tempUser._id.toString();
      examplePost.galleryID = this.tempGallery._id.toString();
      new Post(examplePost).save()
      .then( post => {
        this.tempPost = post;
        done();
      })
      .catch(done);
    });



    after( done => {
      delete exampleGallery.userID;
      delete examplePost.galleryID;
      delete examplePost.userID;
      done();
    });
    describe('with a valid token and valid data', () => {

      it('should return an image', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}/image`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .field('name', exampleImage.name)
        .field('desc', exampleImage.desc)
        .attach('image', exampleImage.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(exampleImage.name);
          expect(res.body.desc).to.equal(exampleImage.desc);
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          imageData = res.body;
          done();
        });
      });
    });
  });
  describe('DELETE: api/image/:imageID', () => {
    before( done => {
      new User(exampleUser)
      .generatePasswordHash(exampleUser.password)
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
      exampleGallery.userID = this.tempUser._id.toString();
      new Gallery(exampleGallery).save()
      .then( gallery => {
        this.tempGallery = gallery;
        done();
      })
      .catch(done);
    });

    before( done => {
      examplePost.userID = this.tempUser._id.toString();
      examplePost.galleryID = this.tempGallery._id.toString();
      new Post(examplePost).save()
      .then( post => {
        this.tempPost = post;
        done();
      })
      .catch(done);
    });

    after( done => {
      delete exampleGallery.userID;
      delete examplePost.galleryID;
      delete examplePost.userID;
      done();
    });

    before(done => {
      exampleImage.userID = this.tempUser._id.toString();
      exampleImage.galleryID = this.tempGallery._id.toString();
      exampleImage.postID = this.tempPost._id.toString();
      exampleImage.imageURI = imageData.imageURI;
      exampleImage.objectKey = imageData.objectKey;
      new Image(exampleImage).save()
      .then(image => {
        this.tempImage = image;
        done();
      })
      .catch(done);
    });

    describe('with a valid image id', () => {
      it('should delete and return a 204', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}/image/${this.tempImage._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
      });
    });
  });


});
