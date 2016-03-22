'use strict';
let express = require('express');
let app = express();

let bodyParser = require('body-parser');
let mongoose = require('mongoose');
// let DB_PORT =
let UserRouter = express.Router();
let User = require('./models/user');

app.use('/user', UserRouter);
require( __dirname + '/routes/login')(UserRouter, User);




app.listen(3000, ()=>{
  console.log('Port 3000 is listening...');
});
