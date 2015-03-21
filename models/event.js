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
    short_name: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 25
    },
    short_description: {
      type: 'string',
      minLength: 40,
      maxLength: 70,
      required: function() {
        return this.featured;
      }
    },
    image: {
      type: 'string',
      required: function() {
        return this.featured;
      }
    },
    featured: 'boolean',
    recurrence: 'string',

    committee: {
      model: 'committee'
    }
  }
});

module.exports = Event;
