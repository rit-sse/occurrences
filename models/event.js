var Waterline = require('waterline');

var Event = Waterline.Collection.extend({

  identity: 'event',
  connection: 'database',

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    start_date: {
      type: 'datetime',
      required: true,
      before: function() {
        return this.end_date
      }
    },
    end_date: {
      type: 'datetime',
      required: true,
      after: function() {
        return this.start_date
      }
    },
    description: 'text',
    location: {
      type: 'string',
      required: true
    },
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
      model: 'committee',
      required: true
    }
  }
});

module.exports = Event;
