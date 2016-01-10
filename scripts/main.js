var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;






var App = React.createClass({
  getInitialState : function(){

    return {
      heroes : require('./herodata')
    }
  },
  handleClick: function(index) {
    if (opponents.length <6 ) {
      opponents.push(index);
    } else {
      alert('6 chosen');
    }
  },
  renderHero : function(key){

    return <Hero key={key} index={key} details={this.state.heroes[key]} />
  },


  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Counter your Enemies" />
          <ul className="list-of-heroes">
            {Object.keys(this.state.heroes).map(this.renderHero)}
          </ul>
        </div>
      </div>
    )
  }
});

var Hero = React.createClass({

  render: function() {
    var details = this.props.details;
    var opponents = [];



    return (
        <li className={details.name + " " + details.type + " " + "heroes"}  onClick={this.handleThatEvent}>
          <p>{details.name}</p>
          <img src={details.largeImg} />
        </li>
    )
  },
  handleClick: function(index) {
    if (opponents.length <6 ) {
      opponents.push(index);
    } else {
      alert('6 chosen');
    }
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
