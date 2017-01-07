'user strict';

const expect = require('chai').expect;

const server = require('../server.js');

describe('Server Test', function(){
  it('should return is running', done => {
    expect(server.isRunning).to.equal(true);
    done();
  })
});
