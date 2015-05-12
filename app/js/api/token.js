var core = require('./core');
var url = require('./config').apiUrl;
var baseEndpoint = `${url}/token`;
require('../local-storage');

var Token = {

  request(username, password) {
    return core
      .post(`${baseEndpoint}`, { username, password })
      .then((json) => {
        localStorage.setObject('jwt', json);
        setTimeout(() => {
          Token.refresh();
        }, 30*60000);
        return json;
      });
  },

  refresh() {
    return core
      .post(`${baseEndpoint}?refresh=true`)
      .then((json) => {
        localStorage.setObject('jwt', json);
        setTimeout(() => {
          Token.refresh();
        }, 30*60000);
        return json;
      });
  },

  remove() {
    localStorage.removeItem('jwt');
  }
}

module.exports = Token;
