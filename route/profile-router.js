'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const debug = require('debug')('gear-share:post-router');

const User = require('../model/user.js');

const bearerAuth = require('../lib/bearer-auth-middleware.js');

const profileRouter = module.exports = Router();

profileRouter.get('/api/profile/:userID', bearerAuth, function(req, res, next){
  debug('GET: /api/profile/:userID');


  User.findById(req.params.userID)
  .then(user => {
    console.log('user',user);
    if(user === null) return next(createError(404,'user not found'));
    if(user._id.toString() !== req.user._id.toString()){
      return next(createError(401, 'unauthorized user'));
    }
    res.json(user);
  })
  .catch(next);

});
