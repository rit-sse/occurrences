var Waterline = require('waterline');

var Event = require('./event');
var Committee = require('./committee');

var orm = new Waterline();

orm.loadCollection(Event);
orm.loadCollection(Committee);

module.exports = orm;
