import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SneakerFeed from "./SneakerFeed";
import Spinner from "../common/Spinner";
import { getSneakers } from "../../actions/sneakerActions";
import Navbar from "../../components/layout/Navbar";

export class AllSneakers extends Component {
  componentDidMount() {
    this.props.getSneakers();
  }

  render() {
    const { sneakers, loading } = this.props.sneaker;
    let sneakerContent;

    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = <SneakerFeed sneakers={sneakers} />;
    }

    return (
      <div className="sneakerPosts">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="heading">
              <h1>User Sneakers</h1>
              <p>All the sneakers posted by our users</p>
            </div>
          </div>
          <div className="row">
                {sneakerContent}             
          </div>
        </div>
      </div>
    );
  }
}

AllSneakers.propTypes = {
  getSneakers: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sneaker: state.sneaker
});

export default connect(
  mapStateToProps,
  { getSneakers }
)(AllSneakers);
