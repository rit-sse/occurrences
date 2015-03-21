var Waterline = require('waterline');

var Committee = Waterline.Collection.extend({

  identity: 'committee',
  connection: 'database',

  attributes: {
    name: 'string',

    events: {
      collection: 'event',
      via: 'committee'
    },
  }
});

module.exports = Committee;
