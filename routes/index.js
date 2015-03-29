var path = require('path');

var app = require('../app');

module.exports = function() {
  app.use('/api/token', require('./token'));
  app.use('/api/events', require('./events'));
  app.use('/api/committees', require('./committees'));
  app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}
