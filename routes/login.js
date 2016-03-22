'use strict';
let jwt = require('jsonwebtoken');
// let User = require( __dirname + '/../models/user');

module.exports = (router, model)=>{
  router.post('/login', (req, res)=>{
    console.log('Here is : ' + JSON.stringify(req.headers));
  });
}
