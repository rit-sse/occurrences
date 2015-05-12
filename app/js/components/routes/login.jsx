var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Login  = React.createClass({

  mixins: [FluxMixin],

  getInitialState() {
    return {
      user: {}
    }
  },

  submitForm(e) {
    e.preventDefault();
    var username = this.refs.username.getDOMNode();
    var password = this.refs.password.getDOMNode();
    this.getFlux().actions.auth.login(username.value, password.value);
    username.value = '';
    password.value = '';
  },

  render() {
    return (
      <form className="form-horizontal" onSubmit={this.submitForm} >
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 control-label">
            Username
          </label>
          <div className="col-sm-10">
            <input type="text" ref="username" className="form-control" id="username" name="username" placeholder="Username" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm-2 control-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" ref="password" className="form-control" id="password" name="password" placeholder="Password" />
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

module.exports = Login;
