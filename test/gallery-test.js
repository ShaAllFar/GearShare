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
// const url = 'https://gear-share-staging.herokuapp.com';


mongoose.Promise = Promise;

const exampleUser = testData.exampleUser;
const exampleGallery = testData.exampleGallery;

describe('Gallery Routes', function(){
  before(done => {
    serverToggle.serverOn(server,done);
  });
  after(done => {
    serverToggle.serverOff(server,done);
  });
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
          expect(date).to.not.equal('Invalid Date');
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
        });
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
        .catch(done);
      });
      it('should return not found', done => {
        request.post(`${url}/api/route`)
        .send(exampleUser)
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
        });
      });
    });
  });

  describe('GET: /api/gallery/:id', () => {
    describe('with a valid body', () => {
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
      });
      it('should return a gallery', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleGallery.name);
          expect(res.body.desc).to.equal(exampleGallery.desc);
          expect(res.body._id).to.equal(this.tempGallery._id.toString());
          expect(res.body.userID).to.equal(this.tempUser._id.toString());
          expect(res.body.createdOn).to.not.equal('Invalid Date');
          done();
        });
      });
    });
    describe('with an invalid id', () => {
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
      });
      it('should return not found', done => {
        request.get(`${url}/api/gallery/58746492f2d22219c580af0e`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          console.log(res.response.text);
          expect(res.status).to.equal(404);
          expect(res.response.text).to.equal('NotFoundError');
          done();
        });
      });
    });
    describe('with no token', () => {
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user  => user.save())
        .then(user => {
          this.tempUser = user;
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
      });
      it('should return unauthorized', done => {
        request.get(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: 'Bearer '
        })
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('PUT: /api/gallery/:id', () => {
    describe('with a valid body', () => {
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
      });
      it('should return updated gallery', done => {
        let updated = {name: 'updated name', desc: 'updated description'};

        request.put(`${url}/api/gallery/${this.tempGallery._id}`)
        .send(updated)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('updated name');
          expect(res.body.desc).to.equal('updated description');
          done();
        });
      });
    });
    describe('with an invalid body', () => {
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
      });
      it('should return bad request', done => {
        let updated = {test: 'test', test2: 'test2'};

        request.put(`${url}/api/gallery/${this.tempGallery._id}`)
        .send(updated)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end(res => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('with an invalid id', () => {
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
      });
      it('should return not found', done => {
        let updated = {name: 'new name', desc: 'new description'};

        request.put(`${url}/api/gallery/58746b9374c1802939d195c7`)
        .send(updated)
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
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user  => user.save())
        .then(user => {
          this.tempUser = user;
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
      });
      it('should return unauthorized', done => {
        let updated = {name: 'new name', desc: 'new description'};

        request.put(`${url}/api/gallery/${this.tempGallery._id}`)
        .send(updated)
        .set({
          Authorization: 'Bearer '
        })
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });

  describe('DELETE: /api/gallery/:id', () => {
    describe('with a valid body', () => {
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
      });
      it('should remove the gallery', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: `Bearer ${this.tempToken}`
        })
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).to.equal(204);
          done();
        });
      });
    });
    describe('with an invalid id', () => {
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
      });
      it('should return not found', done => {
        request.delete(`${url}/api/gallery/58746edd70b5ae307c23935g`)
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
      before(done => {
        new User(exampleUser)
        .generatePasswordHash(exampleUser.password)
        .then(user  => user.save())
        .then(user => {
          this.tempUser = user;
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
      });
      it('should return unauthorized', done => {
        request.delete(`${url}/api/gallery/${this.tempGallery._id}`)
        .set({
          Authorization: 'Bearer '
        })
        .end(res => {
          expect(res.status).to.equal(401);
          done();
        });
      });
    });
  });
});
