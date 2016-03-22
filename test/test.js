'use strict';
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

let request = chai.request();
let expect = chai.expect();
require('./../server.js');
process.env.MONGOLAB_URI = 'mongodb://localhost/db/test';

describe('Integration test on /register route',()=>{
  it('should have authorization data in headers',(done)=>{
    request('localhost:3000')
    .post('/register')
    .send({name: 'myname', password: '12345'});
    .end((err, res)=>{
      expect(err).to.eql.(null);
    });
  });
});
