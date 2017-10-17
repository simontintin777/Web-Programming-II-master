import React, { Component } from "react";
import { Link } from "react-router-dom";

class PokemonList extends Component {
  render() {
    const { pokemons } = this.props;
    if (pokemons.length === 0) {
      return <h2>No pokemon yet!</h2>;
    }

    const pokemonDisplays = pokemons.map(pokemon => {
      // const name = pokemon.name ? (
      //   <p>{pokemon.name}</p>
      // ) : null;
      var array = pokemon.url.split('/');
      const pokemonId = array[array.length-2];
      const pictureId = (pokemonId < 10)? ("00"+pokemonId)
      : (pokemonId < 100)? ("0"+pokemonId) 
      : pokemonId;
      
      const picture =  (
        <img
          className="img-responsive"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pictureId}.png`}
          alt={pokemon.name}
        />
      );

      return (
        <div className="col-sm-6 col-md-4" key={pokemonId}>
          <h3>
            <Link to={`/pokemon/${pokemonId}`}>{pokemon.name}</Link>
          </h3>
          <Link to={`/pokemon/${pokemonId}`}>{picture}</Link>
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Pokemons</h2>
            <div className="row">{pokemonDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default PokemonList;
