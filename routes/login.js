'use strict';
let jwt = require('jsonwebtoken');
// let User = require( __dirname + '/../models/user');

module.exports = (router, User)=>{
  router.post('/login', (req, res)=>{
    console.log('Here is : ' + JSON.stringify(req.headers.authorization));
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(authArray);
    console.log('Method : ' + method, ' name : ' + name, ' pass : ' + password );
    let newUser = new User({name: name, password: password});
    User.find({name: name}, (user)=>{
      console.log('Here is : ' + newUser);
      let valid = newUser.compareHash(password)
      console.log(valid);
      if(!valid){
        return res.json({status: 'failure'})
      }
        res.json({token: user.generateToken()});
    });
  });
}
