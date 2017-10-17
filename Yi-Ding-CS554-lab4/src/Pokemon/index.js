import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PokemonPage from "./PokemonPage/PokemonPage";
import SinglePokemon from "./SinglePokemon/SinglePokemon";

class Pokemon extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    console.log(this.props.match.url);
    // alert(url);
    return (
      <div className="row">
        
        <div className="col-sm-10 col-sm-offset-1">
          <Switch>          
            <Route path={`${url}/page/:page`} component={PokemonPage} />
            <Route path={`${url}/:id`} component={SinglePokemon} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Pokemon;
// this.props.match.url
