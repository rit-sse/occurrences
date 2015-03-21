var Waterline = require('waterline');

var Event = Waterline.Collection.extend({

  identity: 'event',
  connection: 'database',

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    start_date: 'date',
    end_date: 'date',
    description: 'text',
    location: 'string',
    short_name: 'string',
    short_description: 'string',
    image: 'string',
    featured: 'boolean',
    recurrence: 'string',

    committee: {
      model: 'committee'
    }
  }
});

module.exports = Event;
