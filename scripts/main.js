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
        hero1: {},
        selectedHeros: [null, null, null, null, null, null],
        showResults: true
      }
    },
    // componentDidMount : function() {
    //   base.syncState('/heroes', {
    //     context : this,
    //     state : 'selectedHeros'
    //   });
    // },
    opponentState: function (index, key) {
      var nullFound = false
      for (var i = 0; i < this.state.selectedHeros.length; i++) {
        if (this.state.selectedHeros[i] === null) {
          this.state.selectedHeros[i] = {index: i, key: index}

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

          <Hero
            key={key}
            index={key}
            selectedHeros={this.state.selectedHeros}
            details={heroes[key]}
            opponentState={this.opponentState}
            filledOpponents={this.filledOpponents}
            heroes={heroes}
             />

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
        <div className="list-of-heroes">
          <ToggleDisplay show={this.state.showResults}>
            <ul className="list-of-heroes2">
              {Object.keys(heroes).map(this.renderHero)}
            </ul>
          </ToggleDisplay>
        </div>
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
      var index = this.props.index
      this.props.opponentState(index)
    },

    render: function () {
      var details = this.props.details

      return (
      <li className={details.name + ' ' + details.type + ' ' + 'heroes'} onClick={this.onButtonClick}>
        <div><h2><span>
          {details.name}
        </span></h2>
        <img src={details.largeImg} /></div>
      </li>
      )
    }
  })

var OpponentSection = React.createClass(
  {
    renderOrder: function (key) {
      var hero = this.props.heroes[key]
      var nullHeros = this.props.nullHeros
      var selectedHeros = this.props.selectedHeros
      var removeButton = <button onClick={this.props.removeOpponent.bind(null, key)}>
                           &times;
                         </button>

      if (selectedHeros[key] === null) {
        return <li key={key} className={'opponents' + ' ' + key}>
                 <h2><span>{nullHeros[key].name}</span></h2>
                 <span className="image"><img src={nullHeros[key].largeImg} /></span>
               </li>
      } else {
        return <li key={key} className="opponents">
                 <h2><span>{this.props.heroes[selectedHeros[key].key].name}</span></h2>
                 <span className="image"><img src={this.props.heroes[selectedHeros[key].key].largeImg} /></span>
                 {removeButton}
               </li>
      }
    },

    render: function () {
      var opponents = Object.keys(this.props.selectedHeros)
      return (
      <div className="order-wrap">
        <h3 className="order-title">Kill These Heroes</h3>
        <ul className="order">
          {opponents.map(this.renderOrder)}
        </ul>
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

/*
Routes
*/

var routes = (
<Router history={createBrowserHistory()}>
  <Route path="/" component={App} />
  <Route path="*" component={NotFound} />
</Router>
)

ReactDom.render(routes, document.querySelector('#main'))
