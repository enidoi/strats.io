var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;
var ToggleDisplay = require('react-toggle-display');
//firebase
// var Rebase = require('re-base');
// var base = Rebase.createClass('https://glowing-fire-4684.firebaseio.com/');






/*
Initial State - Heroes with data, selectedOppponents empty object.
Methods:
opponentState is the click handler in the hero component that loads my empty selectedOppponents object with here data
renderHero renders the hero elements indivdually into react and list items in the HTML
renderOpponents renders the selected opponetns above the hero select screen.
*/

var App = React.createClass({
  getInitialState : function(){
    return {
      heroes : require('./herodata'),
      order: {},
      selectedHeros: [],
      showResults: true
    };
  },
  // componentDidMount : function() {
  //   console.log("The Component Did Mount");
  //   base.syncState();
  // },
  opponentState : function(key)
  {
    this.state.selectedHeros.push(key)
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order : this.state.order });
  },
  filledOpponents : function () {
    if (this.state.selectedHeros.length === 5) {
      this.setState({ showResults: false });
    }
  },
  renderHero : function(key){
    return (
      <div key={key}>
        <ToggleDisplay show={this.state.showResults}>
          <Hero key={key} index={key} selectedHeros={this.state.selectedHeros} details={this.state.heroes[key]} opponentState={this.opponentState} filledOpponents={this.filledOpponents} />
        </ToggleDisplay>
      </div>
    )
  },

render : function() {
    return (
      <div className="app">
          <Header tagline="Counter your Enemies" />
            <div className="selected-opponents">
              <Order selectedHeros={this.state.selectedHeros} heroes={this.state.heroes} order={this.state.order} />
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
  onButtonClick : function()
  {
    this.props.filledOpponents(this.props.selectedHeros.length);
  	if(this.props.selectedHeros.length < 6)
  	{
    	var key = this.props.index;
    	this.props.opponentState(key);
    }
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



var Order = React.createClass({
  renderOrder : function(key) {
    var hero = this.props.heroes[key];
    var count = this.props.selectedHeros[key];

    return (
        <li key={key} className="opponents">
            {this.props.heroes[this.props.selectedHeros[key]].name}
            {console.log(this.props.heroes[this.props.selectedHeros[key]].name)}
            <span className="image"><img src={this.props.heroes[this.props.selectedHeros[key]].largeImg} /></span>
        </li>
    )
  },

  render: function() {
      var orderIds = Object.keys(this.props.selectedHeros);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
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
