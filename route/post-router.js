'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('gear-share:post-router');

const Post = require('../model/post.js');
const Gallery = require('../model/gallery.js');

const bearerAuth = require('../lib/bearer-auth-middleware.js');

const postRouter = module.exports = Router();


postRouter.post('/api/gallery/:galleryID/post', bearerAuth, jsonParser, function(req ,res, next){
  debug('POST: /api/gallery/:galleryID/post');

  let post_id;

  req.body.galleryID = req.params.galleryID;
  req.body.userID = req.user._id;
  new Post(req.body).save()
  .then(post => {
    post_id = post._id;

    if(!req.body.name) return next(createError(400, 'body required'));
    res.json(post);
  })
  .then(() => Gallery.findById(req.params.galleryID))
  .then(gallery => {
    gallery.postIDs.push(post_id);
    gallery.save();
  })
  .catch(err => {
    next(err);
  });
});

postRouter.get('/api/gallery/:galleryID/post', bearerAuth, function(req, res, next) {
  debug('GET: /api/gallery/:galleyID/post');

  Post.find({galleryID: req.params.galleryID})
  .then(post => {
    if(post === null) return next(createError(404, 'post not found'));
    if(post.userID.toString() !== req.user._id.toString()){
      return next(createError(401, 'invalid user'));
    }
    res.json(post);
  })
  .catch(next);
});


postRouter.get('/api/gallery/:galleyID/post/:postID', bearerAuth, function(req, res, next) {
  debug('GET: /api/gallery/:galleyID/post/:postID');

  Post.findById(req.params.postID)
  .then(post => {
    if(post === null) return next(createError(404, 'post not found'));
    if(post.userID.toString() !== req.user._id.toString()){
      return next(createError(401, 'invalid user'));
    }
    res.json(post);
  })
  .catch(next);
});

postRouter.put('/api/gallery/:galleryID/post/:postID', bearerAuth, jsonParser, function(req,res,next) {
  debug('PUT: /api/gallery/:galleryID/post/:postID');

  if(!req.body.name) return next(createError(400, 'body required'));

  Post.findByIdAndUpdate(req.params.postID, req.body, {new: true})
  .then(post => {
    if(post === null) return next(createError(404,'post not found'));
    res.json(post);
  })
  .catch(err => next(createError(404, err.message)));
});


postRouter.delete('/api/gallery/:galleryID/post/:postID', bearerAuth, function(req, res, next){
  debug('DELETE: /api/gallery/:galleryID/post/:postID');

  Gallery.findById(req.params.galleryID)
  .then(gallery => {
    gallery.postIDs.remove(req.params.postID);
    return Post.findByIdAndRemove(req.params.postID);
  })
  .then(post => {
    if(post === null) return next(createError(404,'id not found'));
    res.status(204).send();
  })
  .catch(err => {
    next(createError(404, err.message));
  });
});
