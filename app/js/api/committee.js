var core = require('./core');
var url = require('./config').apiUrl;
var baseEndpoint = `${url}/committees`;

var Committee = {

  all() {
    return core.get(baseEndpoint);
  },

  one(id) {
    return core.get(`${baseEndpoint}/${id}`);
  },

  create(committee) {
    return core.post(baseEndpoint, { committee });
  },

  update(id, committee) {
    return core.put(`${baseEndpoint}/${id}`, { committee });
  },

  destroy(id) {
    return core.del(`${baseEndpoint}/${id}`);
  }
};

module.exports = Committee;
