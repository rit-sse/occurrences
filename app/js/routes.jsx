var React = require('react');
var Router = require('react-router');

var flux = require('./flux');
var Layout = require('./components/routes/layout');
var Login = require('./components/routes/login');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={Layout} path='/'>
    <DefaultRoute handler={Login} name='login' />
  </Route>
);

module.exports = routes;
