import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import { FeaturedArticles } from "./frontpage-components/FeaturedArticles";
import { Latestnews } from "./frontpage-components/Latestnews";
import { LatestReleases } from "./frontpage-components/LatestReleases";
import Mostliked from "./frontpage-components/MostLikedSneakers"

class Landing extends Component {
 
  render() {
    return (
      <React.Fragment>
        <div className="header header-landing">
          <Navbar />

          <div className="heading">
            <h1 className="heading-1">SOCIAL SOLE</h1>
            <p>
              Welcome to Social Sole. A exciting site where you can read about
              the latest news concerning, sneakers. And post about and share
              your sneaker collection.
            </p>
          </div>

        </div>

        <div className="container container-home">

          <FeaturedArticles />
          <Latestnews />
          <LatestReleases />
          <Mostliked />

        </div>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
