'use strict';

const expect = require('chai').expect;
const request = require('superagent');

const User = require('../model/user.js');
const Gallery = require('../model/gallery.js');
const Post = require('../model/post.js');

const testData = require('./lib/test-data.js');
const serverToggle = require('./lib/toggle-server.js');
const server = require('../server.js');

const url = `http://localhost:${process.env.PORT}`;

const exampleUser = testData.exampleUser;
const exampleGallery = testData.exampleGallery;
const examplePost = testData.examplePost;


describe('Post Routes', function(){
  before(done => {
    serverToggle.serverOn(server, done);
  });
  after(done => {
    serverToggle.serverOff(server, done);
  });
  afterEach(done => {
    Promise.all([
      User.remove({}),
      Gallery.remove({}),
      Post.remove({})
    ])
    .then(() => done())
    .catch(done);
  });
  before(done => {
    new User(exampleUser)
    .generatePasswordHash(exampleUser.password)
    .then(user  => user.save())
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
  before(done => {
    exampleGallery.userID = this.tempUser._id.toString();
    new Gallery(exampleGallery).save()
    .then(gallery => {
      this.tempGallery = gallery;
      done();
    })
    .catch(done);
  });
  after(() => {
    delete exampleGallery.userID;
    //in question
    delete examplePost.galleryID;
  });
  describe('POST: /api/gallery/:galleryID/post', () => {
    describe('with a valid body', () => {
      it('should return a post', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/post/`)
        .send(examplePost)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('post name');
          expect(res.body.desc).to.equal('post description');
          expect(res.body.price).to.equal(200);
          expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          done();
        })
      });
    })
    describe('with an invalid body', () => {
      it('should return bad request', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/post`)
        .send()
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          expect(res.status).to.equal(400);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
    describe('with an invalid route', () => {
      it('should return bad request', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/somewhere`)
        .send(examplePost)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          expect(res.status).to.equal(404);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
    describe('with no token provided', () => {
      it('should return bad request', done => {
        request.post(`${url}/api/gallery/${this.tempGallery._id}/post`)
        .send(examplePost)
        .set({
          Authorization: `Bearer `
        })
        .end(res => {
          expect(res.status).to.equal(401);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
  });

  before(done => {
    examplePost.galleryID = this.tempGallery._id;
    examplePost.userID = this.tempUser._id;
    new Post(examplePost).save()
    .then(post => {
      this.tempPost = post;
      done();
    })
    .catch(done);
  });
  describe('GET: /api/gallery/:galleryID/post/:postID', () => {
    describe('with a valid body', () => {
      it('should return a post', done => {
          request.get(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
          .set({
            Authorization: `Bearer ${this.tempToken}`
          })
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(examplePost.name).to.equal('post name');
            expect(examplePost.desc).to.equal('post description');
            expect(res.body.galleryID).to.equal(this.tempGallery._id.toString());
            expect(res.body.userID).to.equal(this.tempUser._id.toString());
            done();
          })
      });
    });
    describe('with an invalid id', () => {
      it('should return not found', done => {
          request.get(`${url}/api/gallery/${this.tempGallery._id}/post/5875c352abf66a4b867bf7c2`)
          .set({
            Authorization: `Bearer ${this.tempToken}`
          })
          .end(res => {
            expect(res.status).to.equal(404);
            expect(res.body).to.equal(undefined);
            done();
          })
      });
    })
    describe('with no token provided', () => {
      it('should return unauthorized', done => {
          request.get(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
          .set({
            Authorization: `Bearer `
          })
          .end(res => {
            expect(res.status).to.equal(401);
            expect(res.body).to.equal(undefined);
            done();
          })
      });
    })
  });

  describe('PUT: /api/gallery/:galleryID/post/:postID', () => {
    describe('with a valid body', () => {
      it('should return updated post', done => {
        let updated = {name: 'new name', desc: 'new description', price: '100'};

        request.put(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
        .send(updated)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('new name');
          expect(res.body.desc).to.equal('new description');
          expect(res.body.price).to.equal(100);
          done();
        });
      });
    });
    describe('with an invalid body', () => {
      it('should return bad request', done => {
        it('should return updated post', done => {
          let updated = {title: 'new name', description: 'new description', cost: '100'};

          request.put(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
          .send(updated)
          .set({
            Authorization: `Bearer ${this.tempToken}`
          })
          .end(res => {
            expect(res.status).to.equal(400);
            expect(res.body).to.equal(undefined);
            done();
          });
        });
      })
    })
    describe('with an invalid id', () => {
      it('should return not found', done => {
        let updated = {name: 'new name', desc: 'new description', price: 100};

        request.put(`${url}/api/gallery/${this.tempGallery._id}/post/5875c8bcd061f058c8cd8d5g`)
        .send(updated)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          expect(res.status).to.equal(404);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
    describe('with no token provided', () => {
      it('should return unauthorized', done => {
        let updated = {name: 'new name', desc: 'new description', price: '100'};

        request.put(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
        .send(updated)
        .set({
          Authorization: `Bearer `
        })
        .end(res => {
          expect(res.status).to.equal(401);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
  });

  describe('DELETE: /api/gallery/:galleryID/post/:postID', () => {
    describe('with a valid body', () => {
      it('should delete post', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty
          done();
        });
      });
    });
    describe('with an invalid id', () => {
      it('should return not found', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/post/5875d21ed422466a4b802475`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with no token provided', () => {
      it('should return unauthorized', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}/post/${this.tempPost._id}`)
        .set({
          Authorization: `Bearer `
        })
        .end(res => {
          expect(res.status).to.equal(401);
          expect(res.body).to.equal(undefined);
          done();
        });
      });
    });
  });
});
