'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const Image = require('../model/image.js');
// const Post = require('../model/post.js');
const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');
const Post = require('../model/post.js');
const testData = require('./lib/test-data.js');

const serverToggle = require('./lib/toggle-server.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = testData.exampleUser;
const exampleGallery = testData.exampleGallery;
const examplePic = testData.examplePic;
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

      it.only('should return an image', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}/image`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .field('name', examplePic.name)
        .field('desc', examplePic.desc)
        .attach('image', examplePic.image)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.name).to.equal(examplePic.name);
          expect(res.body.desc).to.equal(examplePic.desc);
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
      // console.log(imageData);
      examplePic.userID = this.tempUser._id.toString();
      examplePic.galleryID = this.tempGallery._id.toString();
      examplePic.postID = this.tempPost._id.toString();
      examplePic.imageURI = imageData.imageURI;
      examplePic.objectKey = imageData.objectKey;
      new Image(examplePic).save()
      .then(pic => {
        this.tempPic = pic;
        // console.log(this.tempPic);
        done();
      })
      .catch(done);
    });

    describe('with a valid image id', () => {
      it.only('should delete and return a 204', done => {
        console.log(this.tempPic);
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}/image/${this.tempPic._id}`)
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
