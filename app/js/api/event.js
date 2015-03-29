var core = require('./core');
var url = require('./config').apiUrl;
var baseEndpoint = `${url}/events`;
var Qs = require('qs');

var Event = {

  all(query) {
    return core.get(`${baseEndpoint}?${Qs.stringify(query)}`);
  },

  one(id) {
    return core.get(`${baseEndpoint}/${id}`);
  },

  create(event) {
    return core.post(baseEndpoint, { event });
  },

  update(id, event) {
    return core.put(`${baseEndpoint}/${id}`, { event });
  },

  destroy(id) {
    return core.del(`${baseEndpoint}/${id}`);
  }
};

module.exports = Event;
