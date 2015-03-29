var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({

  render() {
    return (
      <div>
        <p> I am a page </p>
      </div>
    );
  }
});

module.exports = App;
