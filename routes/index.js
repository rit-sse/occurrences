var fs = require('fs');
var path = require('path');

var app = require('../app');

var secret = fs.readFileSync('./secret.key');
var pub = fs.readFileSync('./secret.pub');

module.exports = function() {
  app.use('/api/events', require('./events'));
  app.use('/api/committees', require('./committees'));
  app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}
