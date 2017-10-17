import React, { Component } from "react";
import { Link } from "react-router-dom";

class BerriesList extends Component {
  render() {
    const { berries } = this.props;
    if (berries.length === 0) {
      return <h2>No berries yet!</h2>;
    }

    const berriesDisplays = berries.map(berry => {
      const name = berry.name ? (
        <p>{berry.name}</p>
      ) : null;
      var array = berry.url.split('/');
      const berryId = parseInt(array[array.length-2], 10);

    //   const { thumbnail } = character;
    //   const picture = thumbnail ? (
    //     <img
    //       className="img-responsive"
    //       src={`${thumbnail.path}.${thumbnail.extension}`}
    //       alt={character.name}
    //     />
    //   ) : null;

      return (
        <div className="col-sm-6 col-md-4" key={berryId}>
          <h3>
            <Link to={`/berries/${berryId}`}>{name}</Link>
          </h3>
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Berries</h2>
            <div className="row">{berriesDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default BerriesList;
