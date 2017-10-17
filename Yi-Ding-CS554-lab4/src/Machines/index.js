import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MachinesPage from "./MachinesPage/MachinesPage";
import SingleMachines from "./SingleMachines/SingleMachines";

class Machines extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    console.log(this.props.match.url);
    // alert(url);
    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-1">
          <Switch>          
            <Route path={`${url}/page/:page`} component={MachinesPage} />
            <Route path={`${url}/:id`} component={SingleMachines} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Machines;
// this.props.match.url
