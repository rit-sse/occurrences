var fs = require('fs');

module.exports = {
  secret: fs.readFileSync('./private.key'),
  pub: fs.readFileSync('./public.key')
}
