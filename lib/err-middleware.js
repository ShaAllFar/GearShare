'use strict';

const createError = require('http-errors');
const debug = require('debug')('gear-share:err-middleware.js');

module.exports = function(err,req,res,next){
  debug('err-middleware');


  if(err.status){
    console.log('hit this',err);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'ValidationError'){
    console.log('helllllo');
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }
  console.log('hit that', err);
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
