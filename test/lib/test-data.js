'use strict';

module.exports = exports = {};

exports.exampleUser = {
  username: 'example name',
  email: 'example@test.com',
  password: '1234',
  profileImageURI: `${__dirname}/data/tester.png`,
  location: 'example location'

};

exports.exampleGallery = {
  name: 'example gallery',
  desc: 'example gallery description'
};

exports.exampleImage = {
  name: 'example image',
  desc: 'example image description',
  image: `${__dirname}/../data/tester.png`
};


exports.examplePost = {
  name: 'post name',
  desc: 'post description',
  price: 200,
  category: 'snowboard'
};
