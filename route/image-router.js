'use strict';

const fs = require('fs');
const path = require('path');
const del = require('del');
const AWS = require('aws-sdk');
const multer = require('multer');
const Router = require('express').Router;
const createError = require('http-errors');
const debug = require('debug')('gear-share:image-router');

const Image = require('../model/image.js');
const Post = require('../model/post.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({ dest: dataDir});

const imageRouter = module.exports = Router();

function s3uploadProm(params) {
  return new Promise((resolve, reject) => {

    s3.upload(params, (err, s3data) => {
      if (err) return reject (err);
      resolve(s3data);
    });
  });
}

imageRouter.post('/api/gallery/:galleryID/post/:postID/image', bearerAuth, upload.single('image'), function(req, res, next) {
  debug('POST: /api/gallery/postID/image'); //TODO double check path

  if(!req.body.name || !req.body.desc) {
    del([`${dataDir}/*`]);
    return next(createError(400, 'missing name and/or description'));
  }

  if(!req.file) {
    return next(createError(400, 'file not found'));
  }

  if(!req.file.path) {
    return next(createError(500, 'file not saved'));
  }

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}${ext}`,
    Body: fs.createReadStream(req.file.path)
  };

  Post.findById(req.params.postID)
  .then( () => s3uploadProm(params))
  .then( s3data => {
    del([`${dataDir}/*`]);
    let imageData = {
      name: req.body.name,
      desc: req.body.desc,
      objectKey: s3data.Key,
      imageURI: s3data.Location,
      userID: req.user._id,
      galleryID: req.params.galleryID,
      postID: req.params.postID
    };
    return new Image(imageData).save();
  })
  .then( image => res.json(image))
  .catch( err => {
    del([`${dataDir}/*`]);
    next(createError(404,err.message));
  });

});

imageRouter.delete('/api/gallery/:galleryID/post/:postID/image/:imageID', bearerAuth, function(req, res, next) {
  debug('DELETE: api/gallery/:galleryID/post/:postID/image/:imageID');

  Image.findById(req.params.imageID)
  .then(image => {
    let params = {
      Bucket: process.env.AWS_BUCKET,
      Key: image.objectKey
    };

    s3.deleteObject(params, (err) => {
      if (err) return next(err);
      Image.findByIdAndRemove(req.params.imageID)
      .then(() => res.status(204).send())
      .catch(next);
    });
  })
  .catch(err => next(createError(404,err.message)));

});
