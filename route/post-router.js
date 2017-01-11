'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('gear-share:post-router');

const Post = require('../model/post.js');

const bearerAuth = require('../lib/bearer-auth-middleware.js');

const postRouter = module.exports = Router();


postRouter.post('/api/gallery/:galleryID/post', bearerAuth, jsonParser, function(req ,res, next){
  debug('POST: /api/gallery/:galleryID/post');

  req.body.galleryID = req.gallery._id;
  new Post(req.body).save()
  .then(post => {
    if(!req.body.name) return next(createError(400, 'body required'));
    res.json(post);
  })
  .catch(next);
});


postRouter.get('/api/gallery/:galleyID/post/:postID', bearerAuth, function(req, res, next) {
  debug('GET: /api/gallery/:galleyID/post/:postID');

  Post.findById(req.params.id)
  .then(post => {
    if(req.body.name === null) return next(createError(404, 'post not found'));
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

  Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(post => {
    if(post === null) return next(createError(404,'post not found'));
    res.json(post);
  })
  .catch(err => next(createError(404, err.message)));
});


postRouter.delete('/api/galley/:galleyID/post/:postID',bearerAuth, function(req, res, next){
  debug('DELETE: /api/galley/:galleyID/post/:postID');

  Post.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
