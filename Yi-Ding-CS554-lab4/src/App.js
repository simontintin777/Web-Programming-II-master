import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  // Redirect
} from "react-router-dom";
import Pokemon from "./Pokemon";
import Berries from "./Berries";
import Machines from "./Machines";
import Introduction from "./Introduction/Introduction";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <h1>
              <Link to="/">{this.props.title}</Link>
            </h1>
            <cite>
              Brought to you by {this.props.author} on{" "}
              {this.props.now.toDateString()}
            </cite>
          </div>
          <div className="App-body">
            <div className = "row">
              <nav className = "col-sm-6 col-md-3">
                <h2>
                  <Link to="/pokemon/page/0">Pokemon</Link>
                </h2>
                <p>Pokémon are the creatures that inhabit the <br />world of the Pokémon games. They can be<br /> caught using Pokéballs and trained by battling<br /> with other Pokémon. See Bulbapedia for <br />greater detail.
                </p>
                <h2>
                  <Link to="/berries/page/0">Berries</Link>
                </h2>
                <p>Berries are small fruits that can provide<br /> HP and status condition restoration, <br />stat enhancement, and even damage negation <br />when eaten by Pokémon. Check out Bulbapedia<br /> for greater detail.
                </p>
                <h2>
                  <Link to="/machines/page/0">Machines</Link>
                </h2>
                <p>Machines are the representation of items <br />that teach moves to Pokémon. They vary <br />from version to version, so it is not certain<br /> that one specific TM or HM corresponds to a <br />single Machine.
                </p>
                <div className="list-group">
                  <Link className="list-group-item" to={`/`}>
                    Back to home
                  </Link>
                </div>
              </nav>
              <div className = "col-sm-6 col-md-9">
                <Switch>
                  <Route path="/pokemon" component={Pokemon} />
                  <Route path="/berries" component={Berries} />
                  <Route path="/machines" component={Machines} />
                  <Route path="/" component={Introduction} />
                </Switch>          
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
