'use strict';

module.exports = exports = {};

exports.exampleUser = {
  username: 'example name',
  email: 'example@test.com',
  password: '1234',
  profileImageURI: `${__dirname}/data/tester.png`
};

exports.exampleGallery = {
  name: 'example gallery',
  desc: 'example gallery description'
}

exports.examplePic = {
  name: 'example pic',
  desc: 'example pic description',
  image: `${__dirname}/../data/tester.png`
}

exports.examplePost = {
  name: 'post name',
  description: 'post description',
  price: 'some number'
}
