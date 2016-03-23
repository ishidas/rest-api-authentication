'use strict';
let jwt = require('jsonwebtoken');
// let User = require( __dirname + '/../models/user');
let bcrypt = require('bcrypt');

module.exports = (router, User)=>{
  router.post('/register', (req, res)=>{
    console.log('Here is /register: ' + JSON.stringify(req.headers.authorization));
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(authArray);
    console.log('Method : ' + method, ' name : ' + name, ' pass : ' + password );

    let newUser = new User({name: name, password: password});
    newUser.save((err, user)=>{
      if(err){
        return console.log('Not saved : ' + err);
      }
      console.log('User data is saved! ' + user);
      var tokenGen = user.generateToken();
      console.log(tokenGen);
      console.log('Here is err : ' + err);
      res.send({token: tokenGen});
      res.end();
    });
  });

  router.post('/login', (req, res)=>{
    console.log('Here is get /login: ' + JSON.stringify(req.headers.authorization));
    console.log('req.body : ' + JSON.stringify(req.body));
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(authArray);
    console.log('Method : ' + method, ' name : ' + name, ' pass : ' + password );

    User.findOne({name: name}, (err, user)=>{
      console.log('Here is : ' + user);
      let valid = user.compareHash(password);
      console.log(valid);
      if(!valid){
        res.json({status: 'failure'})
        return
      }
    res.json({token: user.generateToken()});
    res.end();
    });
  });

  router.put('/login/setdata', (req, res)=>{
    console.log('Here is get /login: ' + JSON.stringify(req.headers.authorization));
    console.log('req.body : ' + JSON.stringify(req.body));
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(authArray);
    console.log('Method : ' + method, ' name : ' + name, ' pass : ' + password );

    User.findOne({name: name}, (err, user)=>{
      console.log('Here is : ' + user);
      let valid = user.compareHash(password);
      console.log(valid);
      if(!valid){
        res.json({status: 'failure'})
        return
      }
      res.json({token: user.generateToken()});
      res.end();
    });
  });

  router.delete('/login/delete', (req, res)=>{
    console.log('Here is get /login: ' + JSON.stringify(req.headers.authorization));
    console.log('req.body : ' + JSON.stringify(req.body));
    let authorizationArray = req.headers.authorization.split(' ');
    let method = authorizationArray[0];
    let base64ed = authorizationArray[1];
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0];
    let password = authArray[1];
    console.log(authArray);
    console.log('Method : ' + method, ' name : ' + name, ' pass : ' + password );

    User.findOne({name: name}, (err, user)=>{
      console.log('Here is : ' + user);
      let valid = user.compareHash(password);
      console.log(valid);
      if(!valid){
        return res.json({status: 'failure'})
      }
      res.json({token: user.generateToken()});
      res.end();
    });
  });
};
