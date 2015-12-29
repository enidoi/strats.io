var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');



// Herodata
var owhd = require('./herodata.js');




var App = React.createClass({
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Counter your Enemies" />
          <OpponentPicker />
        </div>
      </div>
    )
  }
});





var Header = React.createClass({

  render : function() {
    return (
      <header className="top">
        <h1>Choose Opponents</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});

/*
  OpponentPicker
  This will let us pick the Opponent team
   <OpponentPicker/>
*/
var lis = [];

for (var i = 0; i < owhd.length; i++) {
    lis.push(<li key={owhd[i].name} className={owhd[i].name + " " + owhd[i].type}>
      <p>{owhd[i].name}</p>
      <img src={owhd[i].largeImg}></img>
      </li>);
}


var OpponentPicker = React.createClass({
  render : function() {

    return (
      <div>
        <ul className="PlayerList">
        {lis}
        </ul>
      </div>
    )
  }
});

/*
  NotFound
  This will let us pick the Opponent team
   <Not Found/>
*/
var NotFound = React.createClass({

  render : function() {
    return (
      <h1>Not Found</h1>
    )
  }
});

/*
Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
)


ReactDom.render(routes, document.querySelector('#main'));
