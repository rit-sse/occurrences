var React = require('react/addons');
var Router = require('react-router');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Login  = React.createClass({

  mixins: [FluxMixin, React.addons.LinkedStateMixin],

  getInitialState() {
    return { user: '', password: '' }
  },

  submitForm(e) {
    e.preventDefault();
    this.getFlux().actions.auth.login(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  },

  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.submitForm} >
          <div className="form-group">
            <label htmlFor="username" className="col-sm-2 control-label">
              Username
            </label>
            <div className="col-sm-10">
              <input type="text" ref="username" className="form-control" id="username" name="username" placeholder="Username" valueLink={this.linkState('username')} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="col-sm-2 control-label">
              Password
            </label>
            <div className="col-sm-10">
              <input type="password" ref="password" className="form-control" id="password" name="password" placeholder="Password" valueLink={this.linkState('password')} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-default" type="submit">Sign In</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Login;
