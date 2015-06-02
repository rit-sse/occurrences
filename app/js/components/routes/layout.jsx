var React = require('react');
var Router = require('react-router');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Layout = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('Auth')],

  getStateFromFlux() {
    var flux = this.getFlux();
    return  {
      user: flux.store('Auth').getState()
    }
  },

  renderAlert() {
    console.log(this.state)
    if(this.state.user.error) {
      return <div className="alert alert-danger">Invalid Credentials</div>;
    } else {
      return <span/>;
    }
  },

  render() {
    return (
      <div className='container'>
        { this.renderAlert() }
        <div id="header" className="page-header">
           <div className="h1">
            <div className="text-left">
              <Link to="login" className="no-decoration">
                Occurrences
              </Link>
              <small style={{paddingLeft: '10px'}} >
                SSE Events or Something
              </small>
            </div>
          </div>
        </div>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = Layout;
