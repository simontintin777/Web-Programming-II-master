import React, { Component } from "react";
import { Link } from "react-router-dom";

class MachinesList extends Component {
  render() {
    const { machines } = this.props;
    if (machines.length === 0) {
      return <h2>No machine yet!</h2>;
    }

    const machinesDisplays = machines.map(machine => {
      var array = machine.url.split('/');
      const machinesId = parseInt(array[array.length-2], 10);
      return (
        <div className="col-sm-6 col-md-4" key={machinesId}>
          <h3>
            <Link to={`/machines/${machinesId}`}>MachineId: {machinesId}</Link>
          </h3>
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Machines</h2>
            <div className="row">{machinesDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default MachinesList;
