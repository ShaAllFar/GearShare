'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const debug = require('debug')('gear-share:post-router');

const User = require('../model/user.js');

const bearerAuth = require('../lib/bearer-auth-middleware.js');

const profileRouter = module.exports = Router();

profileRouter.get('/api/profile/:userID', bearerAuth, function(req, res, next){
  debug('GET: /api/profile/:userID');


  User.findById(req.params.userID)
  .then(user => {
    if(user === null) return next(createError(404,'user not found'));
    if(user._id.toString() !== req.user._id.toString()){
      return next(createError(401, 'unauthorized user'));
    }
    res.json(user);
  })
  .catch(next);
});

profileRouter.put('/api/profile/:userID', bearerAuth, jsonParser, function(req, res, next){
  debug('PUT: /api/profile/:userID');

  User.findByIdAndUpdate(req.params.userID, req.body, {new: true})
  .then(user => {
    if(user === null) return next(createError(404, 'user not found'));
    res.json(user);
  })
  .catch(err => next(createError(404, err.message)));

});
