var React = require('react');
var flux = require('./flux');

var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler flux={flux} />, document.getElementById('app'));
});
