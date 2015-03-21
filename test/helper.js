var connect = require('../config/waterline');
var chai = require('chai');

var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

var connections;

module.exports = function(m) {
  beforeEach(function(done){
    connect(function(err, models) {
      if(err) throw err;
      connections = models.connections;
      for(var key in models.collections) {
        m[key] = models.collections[key];
      }
      done();
    });
  });

  afterEach(function(done){
    connections.database._adapter.teardown('database', done); //Probably shouldn't do this lol
  });
}

