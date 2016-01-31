var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var History = ReactRouter.History;
var ToggleDisplay = require('react-toggle-display');
var nullHeros = require('./nullHeros');
var update = require('react-addons-update');
// firebase
// var Rebase = require('re-base');
// var base = Rebase.createClass('https://strats-io.firebaseio.com/');






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
      selectedHeros: [null, null, null, null, null, null],
      showResults: true
    };
  },
  opponentState : function(index, key)
  {
    for (var i = 0; i < this.state.selectedHeros.length; i++) {
      if(this.state.selectedHeros[i] === null) {
        this.state.selectedHeros[i] = {index: i, key: index};
        var test = this.state.selectedHeros[i];
        this.setState({selectedHeros : test});
        break;
      }
    }
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
  removeOpponent : function(key) {
      var index = this.state.selectedHeros.indexOf(key);
      console.log(index);
        if(index > -1)
          this.setState({ showResults: true });
          this.state.selectedHeros.splice(index, 1);
          this.setState({
            selectedHeros : this.state.selectedHeros
          });

  },



render : function() {
    return (
      <div className="app">
          <Header tagline="Counter your Enemies" />
            <div className="selected-opponents">
              <OpponentSection selectedHeros={this.state.selectedHeros} heroes={this.state.heroes} removeOpponent={this.removeOpponent} filledOpponents={this.filledOpponents} nullHeros={nullHeros}/>
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
    	var index = this.props.index;
    	this.props.opponentState(index);
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



var OpponentSection = React.createClass({
  renderOrder : function(key) {
    var hero = this.props.heroes[key];
    var nullHeros = this.props.nullHeros;
    var selectedHeros = this.props.selectedHeros;
    var removeButton = <button onClick={this.props.removeOpponent.bind(null,key)} >&times;</button>
    for (var i = 0; i < selectedHeros.length; i++) {
        if (selectedHeros[i] === null) {
        return (
        <li key={key} className="opponents">
            {nullHeros[i].name}
            <span className="image"><img src={nullHeros[i].largeImg} /></span>
        </li>
      )
      } else {
          return (
            <li key={key} className="opponents">
                {hero[selectedHeros.key].name}
                <span className="image"><img src={hero[selectedHeros.key].largeImg} /></span>
                {removeButton}
            </li>
                )
              }
            }
  },

  render: function() {
      var opponents = Object.keys(this.props.selectedHeros);

    return (
      <div className="order-wrap">
        <h2 className="order-title">Kill These Heroes</h2>
        <ul className="order">
          {opponents.map(this.renderOrder)}
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
