import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import NotFound from "../../404/404";
// import CharacterDetail from "./CharacterDetail";
// import CharacterComicList from "./CharacterComicList";

class SingleBerries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berry: undefined,
      loading: false,
      error: false
    };
  }

  async loadBerryById(berryId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`berry/${berryId}`);
      const berry = response.data;
      this.setState({ loading: false, berry });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const berryId = this.props.match.params.id;
    await this.loadBerryById(berryId);
  }

  async componentWillReceiveProps(nextProps) {
    const berryId = nextProps.match.params.id;
    const oldBerryId = this.props.match.params.id;

    if (berryId !== oldBerryId) {
      await this.loadBerryById(berryId);
    }
  }

  render() {
    if(this.state.error) {
      return <NotFound/>;
    } 

    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.berry) {
    //   const url = this.props.match.url;
      body = (
        <div>
          <h2>Name:   {this.state.berry.name}</h2>
          <h3>Max_harvest:  {this.state.berry.max_harvest}</h3>
          <h3>Soil_dryness:  {this.state.berry.soil_dryness}</h3>
          <h3>Size:  {this.state.berry.size}</h3>
        </div>
        
      );
    } else {
      body = <div />;
    }

    return <div className="single-berry-page">{body}</div>;
  }
}

export default SingleBerries;
