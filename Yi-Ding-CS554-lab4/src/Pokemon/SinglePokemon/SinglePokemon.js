import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import NotFound from "../../404/404";
// import CharacterDetail from "./CharacterDetail";
// import CharacterComicList from "./CharacterComicList";

class SinglePokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: undefined,
      loading: false,
      error: false
    };
  }

  async loadPokemonById(pokemonId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`pokemon/${pokemonId}`);
      const pokemon = response.data;
      this.setState({ loading: false, pokemon });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const pokemonId = this.props.match.params.id;
    await this.loadPokemonById(pokemonId);
  }

  async componentWillReceiveProps(nextProps) {
    const pokemonId = nextProps.match.params.id;
    const oldPokemonId = this.props.match.params.id;

    if (pokemonId !== oldPokemonId) {
      await this.loadPokemonById(pokemonId);
    }
  }

  render() {
    if(this.state.error) {
      return <NotFound/>;
    } 

    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.pokemon) {
      // const url = this.props.match.url;
      body = (
        <div>
          <h2>Name:  {this.state.pokemon.name}</h2>
          <h3>Weight:  {this.state.pokemon.weight}</h3>
          <h3>Height:  {this.state.pokemon.height}</h3>
          <h3>Type:  {this.state.pokemon.types[0].type.name}</h3>
        </div>
        
      );
    } else {
      body = <div />;
    }

    return <div className="single-pokemon-page">{body}</div>;
  }
}

export default SinglePokemon;
