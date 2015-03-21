var diskAdapter = require('sails-disk');
var postgresAdapter = require('sails-postgresql');

var env = process.env.NODE_ENV || 'development';

var dbConfig = require('./database')[env];


module.exports = {
  adapters: {
    disk: diskAdapter,
    postgres: postgresAdapter
  },

  connections: {
    database: dbConfig
  },

  defaults: {
    migrate: 'alter'
  }
};

