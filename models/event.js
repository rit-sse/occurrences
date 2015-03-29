var Waterline = require('waterline');
var ICal = require('../helpers/ical')

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
      minLength: function() {
        if(this.featured) {
          return 40;
        } else {
          return 0; //Validator breaks when minLength is undefined
        }
      },
      maxLength: function() {
        if(this.featured) return 70; // But it doesn't for max length...
      },
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
    },

    end_date_string: function() {
      return this.end_date.toISOString().replace(/-/g, '').replace(/:/g, '').split('.')[0]
    },

    start_date_string: function() {
      return this.start_date.toISOString().replace(/-/g, '').replace(/:/g, '').split('.')[0]
    }
  }
});

module.exports = Event;
