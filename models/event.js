var Waterline = require('waterline');

var Event = Waterline.Collection.extend({

  identity: 'event',
  connection: 'database',

  attributes: {
    name: 'string',
    start_date: 'date',
    end_date: 'date',
    description: 'text',
    location: 'string',
    short_name: 'string',
    short_description: 'string',
    image: 'string',
    featured: 'boolean',

    committee: {
      model: 'committee'
    }
  }
});

module.exports = Event;
