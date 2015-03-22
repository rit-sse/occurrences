var fs = require('fs');

var app = require('../app');
// console.log(app);

var secret = fs.readFileSync('./secret.key');
var pub = fs.readFileSync('./secret.pub');

module.exports = function() {
  app.use('/api/committees', require('./committees'));
  app.use('/', require('./home'));
}
