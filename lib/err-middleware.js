'use strict';

const createError = require('http-errors');
const debug = require('debug')('gear-share:err-middleware.js');

module.exports = function(err,req,res,next){
  debug('err-middleware');

//remove before merge to master
  console.error(err.name);
  console.error(err.message);
//

  if(err.status){
    res.status(err.status).send(err.name);
    next();
    return;
  }

  if(err.name === 'Validation Error'){
    console.log(err);
    err = createError(400, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }
  if(err.name === 'NoutFoundError'){
    err.createError(404, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
