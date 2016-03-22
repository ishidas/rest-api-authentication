'use strict';
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
  name: String,
  password: String
});

userSchema.pre('save', function(next){
  console.log('This is pre');
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
  next();
});

userSchema.methods.compareHash = function(password){
  console.log('This is password : ' + password);
  console.log('This is this.password : ' + this.password);
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function (){
  jwt.sign({_id: this._id}, 'FLUFFBALL');
};

let User = mongoose.model('User', userSchema);
module.exports = User;
