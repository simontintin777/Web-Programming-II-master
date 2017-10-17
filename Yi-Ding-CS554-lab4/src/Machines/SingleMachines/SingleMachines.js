import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import NotFound from "../../404/404";
// import CharacterDetail from "./CharacterDetail";
// import CharacterComicList from "./CharacterComicList";

class SingleMachines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: undefined,
      loading: false,
      error: false
    };
  }

  async loadMachineById(machineId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`machine/${machineId}`);
      const machine = response.data;
    //   alert(response);
      this.setState({ loading: false, machine: machine });
    } catch (e) {
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const machineId = this.props.match.params.id;
    await this.loadMachineById(machineId);
  }

  async componentWillReceiveProps(nextProps) {
    const machineId = nextProps.match.params.id;
    const oldMachineId = this.props.match.params.id;

    if (machineId !== oldMachineId) {
      await this.loadMachineById(machineId);
    }
  }

  render() {
    if(this.state.error) {
      return <NotFound/>;
    } 

    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.machine) {
      // const url = this.props.match.url;
      body = (
        <div>         
          <h2>ID:  {this.state.machine.id}</h2>
          <h3>Name:  {this.state.machine.move.name}</h3>
          <h3>version_group:  {this.state.machine.version_group.name}</h3> 
        </div>
        
      );
    } else {
      body = <div />;
    }

    return <div className="single-machine-page">{body}</div>;
  }
}

export default SingleMachines;
