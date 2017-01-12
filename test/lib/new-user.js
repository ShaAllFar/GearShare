'use strict';

const debug = require('debug')('debug:new-user');

const User = require('../../model/user.js');
const testData = require('./test-data.js');

module.exports = function() {
  debug('creating new user');
  console.log(testData.exampleUser);
  return new User(testData.exampleUser)
  .generatePasswordHash(testData.exampleUser.password)
  .then(user => user.save())
  .then(user => {
    return user.generateToken();
  });

};
