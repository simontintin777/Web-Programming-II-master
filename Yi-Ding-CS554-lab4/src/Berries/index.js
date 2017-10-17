import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import BerriesPage from "./BerriesPage/BerriesPage";
import SingleBerries from "./SingleBerries/SingleBerries";

class Berries extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    console.log(this.props.match.url);
    // alert(url);
    return (
      <div className="row">
        <div className="col-sm-12 col-sm-offset-1">
          <Switch>         
            <Route path={`${url}/page/:page`} component={BerriesPage} />
            <Route path={`${url}/:id`} component={SingleBerries} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Berries;
// this.props.match.url
