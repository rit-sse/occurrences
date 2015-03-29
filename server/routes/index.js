var path = require('path');
var browserify = require('browserify-middleware')
var reactify = require('reactify');

var app = require('../app');

module.exports = function() {
  app.use('/api/token', require('./token'));
  app.use('/api/events', require('./events'));
  app.use('/api/committees', require('./committees'));
  app.get('/js/main.js', browserify(
    path.join(__dirname, '..', '..', 'app', 'js', 'app.jsx'),{
      precompile: true,
      extensions: ['.jsx'],
      transform: function(f){
        return reactify(f, {es6: true})
      }
    })
  );
  app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', 'app', 'index.html'));
  });
}
