var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;

/*
Initial State - Heroes with data, selectedOppponents empty object.
Methods:
opponentState is the click handler in the hero component that loads my empty selectedOppponents object with here data
renderHero renders the hero elements indivdually into react and list items in the HTML
renderOpponents renders the selected opponetns above the hero select screen.



**** CODE SNIPPET FROM Opponent component comments ****
opponentState : function(key) {
  this.state.selectedOppponents[key] = this.state.selectedOppponents[key];
  this.setState({ selectedOppponents : this.state.selectedOppponents });




*/

var App = React.createClass({
  getInitialState : function(){
    return {
      heroes : require('./herodata'),
      order: {}
    }
  },
  opponentState : function(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order : this.state.order });
  },
  renderHero : function(key){
    return <Hero key={key} index={key} details={this.state.heroes[key]} opponentState={this.opponentState} />
  },
  renderOpponents : function(key){
    return <Opponents key={key} index={key} details={this.state.selectedOppponents[key]} />
  },

render : function() {
    return (
      <div className="app">
          <Header tagline="Counter your Enemies" />
            <div className="selected-opponents">
              <Order heroes={this.state.heroes} order={this.state.order} />
            </div>
              <ul className="list-of-heroes">
                {Object.keys(this.state.heroes).map(this.renderHero)}
              </ul>
      </div>
    )
  }
});

/*
Hero componentloads the hero date into line items and an image for each hero. the App component uses the .map method to iterate over the data.
*/

var Hero = React.createClass({
  onButtonClick : function() {
    console.log("going to push opponent key ", this.props.index);
    var key = this.props.index;
    this.props.opponentState(key);
  },

  render: function() {
    var details = this.props.details;



    return (
        <li className={details.name + " " + details.type + " " + "heroes"} onClick={this.onButtonClick}>
          <p >{details.name}</p>
          <img src={details.largeImg} />
        </li>
    )
  }
});


/*
Opponent component i am able to load a copy of the hero but for the selected opponents.
i believe this is a better way to do this as i already see the limiting factor of a couple of things:
1. i repeated the hero compnonet and just changed the characters
2. i am able to pass the key value so i should have been able to just use the key value to load parts of hero data i needed
3. currently this will not allow for multiple hero selections where the key value did.
*/
var Opponents = React.createClass({

  render: function() {
    var details = this.props.details;

    return (
      <li className={details.name + " " + details.type + " " + "opponents"}>
        <p >{details.name}</p>
        <img src={details.largeImg} />
      </li>
    )
  }
});


var Order = React.createClass({
  renderOrder : function(key) {
    var hero = this.props.heroes[key];
    var count = this.props.order[key];

    if(!hero) {
      return <li key={key}> No one to play against</li>
    }

    return (
    <li>
        {count} x
        {hero.name}
        <span className="image"><img src={hero.largeImg} /></span>
    </li>)
  },

  render: function() {
      var orderIds = Object.keys(this.props.order);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="order">
          </li>
        </ul>
      </div>
    )
  }
})


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
