'use strict';
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let UserRouter = express.Router();
let User = require('./models/user');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use('/user', UserRouter);
app.use(bodyParser.json());
require( __dirname + '/routes/login')(UserRouter, User);




app.listen(3000, ()=>{
  console.log('Port 3000 is listening...');
});
