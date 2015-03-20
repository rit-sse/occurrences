var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development';

// var routes =
var jwt = require('express-jwt');

var fs = require('fs');

var app = module.exports = express();

app.use(cors());
// app.use(jwt({secret: pub}).unless({path: ['/token']}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./routes')();

// error handlers

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (env != 'development') {
    res.status(err.status || 500).send('internal server error!');
  }
  else {
  	console.log(err.stack);
    res.status(err.status || 500).send(err);
  }
});
