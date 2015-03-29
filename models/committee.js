var Waterline = require('waterline');

var Committee = Waterline.Collection.extend({

  identity: 'committee',
  connection: 'database',

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },

    events: {
      collection: 'event',
      via: 'committee'
    },
  }
});

module.exports = Committee;
