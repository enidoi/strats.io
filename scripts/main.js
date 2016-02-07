var React = require('react')
var ReactDom = require('react-dom')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Navigation = ReactRouter.Navigation
var createBrowserHistory = require('history/lib/createBrowserHistory')
var History = ReactRouter.History
var ToggleDisplay = require('react-toggle-display')
var nullHeros = require('./nullHeros')
var heroes = require('./herodata');
var h = require('./helpers')
// firebase
var Rebase = require('re-base')
var base = Rebase.createClass('https://strats-io.firebaseio.com/')

/*
Initial State - Heroes with data, selectedOppponents empty object.
Methods:
opponentState is the click handler in the hero component that loads my empty selectedOppponents object with here data
renderHero renders the hero elements indivdually into react and list items in the HTML
renderOpponents renders the selected opponetns above the hero select screen.
*/

var App = React.createClass(
  {
    getInitialState: function () {
      return {

        selectedHeros: [null, null, null, null, null, null],
        showResults: true
      }
    },
    componentDidMount : function() {
      base.syncState(this.props.params.playerName + '/heroes', {
        context : this,
        state : ''
      });
    },
    loadHeroes : function() {
      this.setState({
        heroes : require('./herodata')
      });
    },
    opponentState: function (index, key) {
      var nullFound = false
      for (var i = 0; i < this.state.selectedHeros.length; i++) {
        if (this.state.selectedHeros[i] === null) {
          this.state.selectedHeros[i] = {index: i, key: index}
          // var test = this.state.selectedHeros[i]
          this.setState({selectedHeros: this.state.selectedHeros})
          break // has to go here or else you only loop once...
        }
      }

      for (var i = 0; i < this.state.selectedHeros.length; i++) {
        if (this.state.selectedHeros[i] === null) {
          nullFound = true
          break
        }
      }

      if (nullFound) {
        return this.setState({ showResults: true })
      } else {
        return this.setState({ showResults: false })
      }
    },

    filledOpponents: function (key) {
      // Doesnt Work!
      // if (this.state.selectedHeros.length === 5) {
      //     console.log(this.state.selectedHeros.length)
      // 	this.setState({ showResults: false })
      // }
      this.state.selectedHeros.isNull = function () {
        return this.setState({ showResults: false })
      }
    },

    renderHero: function (key) {
      return (
      <div key={key}>
        <ToggleDisplay show={this.state.showResults}>
          <Hero
            key={key}
            index={key}
            selectedHeros={this.state.selectedHeros}
            details={heroes[key]}
            opponentState={this.opponentState}
            filledOpponents={this.filledOpponents}
             />
        </ToggleDisplay>
      </div>
      )
    },

    removeOpponent: function (key) {
      var index = this.state.selectedHeros[key].index
      console.log(index)

      if (index > -1) {
        this.setState({ showResults: true })
        this.state.selectedHeros[index] = null
        this.setState({selectedHeros: this.state.selectedHeros})
      }
    },

    render: function () {
      return (
      <div className="app">
        <Header tagline="Counter your Enemies" />
        <div className="selected-opponents">
          <OpponentSection
            selectedHeros={this.state.selectedHeros}
            heroes={heroes}
            removeOpponent={this.removeOpponent}
            filledOpponents={this.filledOpponents}
            nullHeros={nullHeros}
            loadHeroes={this.loadHeroes} />
        </div>
        <ul className="list-of-heroes">
          {Object.keys(heroes).map(this.renderHero)}
        </ul>
      </div>
      )
    }
  })

/*
Hero componentloads the hero date into line items and an image for each hero. the App component uses the .map method to iterate over the data.
*/

var Hero = React.createClass(
  {
    onButtonClick: function () {
      var index = heroes.index
      this.props.opponentState(index)
    },

    render: function () {
      var details = this.props.details

      return (
        <div>
      <li className={details.name + ' ' + details.type + ' ' + 'heroes'} onClick={this.onButtonClick}>
        <p>
          {details.name}
        </p>
        <img src={details.largeImg} />
      </li>

      </div>
      )
    }
  })

var OpponentSection = React.createClass(
  {
    renderOrder: function (key) {
      var hero = heroes[key]
      var nullHeros = this.props.nullHeros
      var selectedHeros = this.props.selectedHeros
      var removeButton = <button onClick={this.props.removeOpponent.bind(null, key)}>
                           &times;
                         </button>

      if (selectedHeros[key] === null) {
        return <li key={key} className={'opponents' + ' ' + key}>
                 {nullHeros[key].name}
                 <span className="image"><img src={nullHeros[key].largeImg} /></span>
               </li>
      } else {
        return <li key={key} className="opponents">
                 {hero[selectedHeros[key]].name}
                 <span className="image"><img src={hero[selectedHeros[key]].largeImg} /></span>
                 {removeButton}
               </li>
      }
    },

    render: function () {
      var opponents = Object.keys(this.props.selectedHeros)
      return (
      <div className="order-wrap">
        <h2 className="order-title">Kill These Heroes</h2>
        <ul className="order">
          {opponents.map(this.renderOrder)}
        </ul>
        <button onClick={this.props.loadHeroes}>Load Heroes</button>
      </div>
      )
    }
  })

var Header = React.createClass(
  {
    render: function () {
      return (
      <header className="top">
        <h1>Choose Opponents</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
      )
    }
  })

/*
  NotFound
  This will let us pick the Opponent team
   <Not Found/>
*/
var NotFound = React.createClass(
  {
    render: function () {
      return (
      <h1>Not Found</h1>
      )
    }
  })



//Login Page

var LoginPicker = React.createClass({
  mixins : [History],
    goPlayer : function(event) {
      event.preventDefault();
      var playerName = this.refs.playerName.value;
      this.history.pushState(null, '/player/' + playerName);
    },
    render : function() {
      return (
        <form className="login-picker" onSubmit={this.goPlayer}>
          <h2>Who are you?</h2>
          <input type="text" ref="playerName" defaultValue={h.getFunName()} required />
          <input type="Submit" />
        </form>
      )
    }
})





/*
Routes
*/

var routes = (
<Router history={createBrowserHistory()}>
  <Route path="/" component={LoginPicker} />
  <Route path="/player/:playerName" component={App} />
  <Route path="*" component={NotFound} />
</Router>
)

ReactDom.render(routes, document.querySelector('#main'))
