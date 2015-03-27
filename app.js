var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var jwt = require('express-jwt');
var fs = require('fs');
var mime = require('mime');

var env = process.env.NODE_ENV || 'development';

var app = module.exports = express();

app.use(cors());
// app.use(jwt({secret: pub}).unless({path: ['/token']}));
if(env === 'development') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req, res, next){
  var regexp = /\.(json|csv|ics)$/;

  var match = req.path.match(regexp);

  if(!match) {
    return next();
  } else {
    req.headers.accept = mime.lookup(match[1]);
    req.url = req.url.replace(regexp, '');

    next()
  }
})

app.use(function(req, res, next) {
  req.models = app.models;
  next();
});

require('./routes')();

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  if (env === 'production') {
    res.status(err.status || 500).send('internal server error!');
  }
  else {
    if(env === 'development') {
      console.log(err.stack);
    }
    res.status(err.status || 500).send(err);
  }
});
