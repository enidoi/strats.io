var React = require('react');
var ReactDom = require('react-dom');
var owhd = require('./herodata.js');




var App = React.createClass({
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Counter your Enemies"/>
        </div>
        <OpponentPicker/>
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
})

/*
  OpponentPicker
  This will let us pick the Opponent team
   <OpponentPicker/>
*/
var OpponentPicker = React.createClass({

  render : function() {
    return (
      <p>OpponentPicker</p>
    )
  }
})



ReactDom.render(<App/>, document.querySelector('#main'));
