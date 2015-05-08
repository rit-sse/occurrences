var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 control-label">
            Username
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="username" name="username" placeholder="Username"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm-2 control-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-default" type="submit">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
});

module.exports = App;
