var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Layout = React.createClass({

  render() {
    return (
      <div className='container'>
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
