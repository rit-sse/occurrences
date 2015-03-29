var diskAdapter = require('sails-disk');
var postgresAdapter = require('sails-postgresql');
var memoryAdapter = require('sails-memory');

var env = process.env.NODE_ENV || 'development';

var dbConfig = require('./database')[env];
var orm = require('../models');

var config = {
  adapters: {
    disk: diskAdapter,
    postgres: postgresAdapter,
    memory: memoryAdapter
  },

  connections: {
    database: dbConfig
  },

  defaults: {
    migrate: 'alter'
  }
};

module.exports = function() {
  return new Promise(function (resolve, reject) {
    var callback = function(err, models) {
      if(err) {
        reject(err);
      } else {
        resolve(models);
      }
    }

    orm.initialize(config, callback);
  });

}
