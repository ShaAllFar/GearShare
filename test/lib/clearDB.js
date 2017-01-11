'use strict';

const debug = require('debug')('debug:clearDB');

const User = require('../../model/user.js');
const Gallery = require('../../model/gallery.js');
const Post = require('../../model/post.js');
const Image = require('../../model/image.js');

module.exports = function(done) {
  debug('clearing DB');
  Promise.all([
    User.remove({}),
    Gallery.remove({}),
    Post.remove({}),
    Image.remove({}),
  ])
  .then( () => done())
  .catch(done);
};
