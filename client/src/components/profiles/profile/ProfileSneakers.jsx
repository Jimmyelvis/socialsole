import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import SneakerFeed from "./profilesneakers/SneakerFeed";
import { getSneakersByUser } from "../../../actions/sneakerActions";
import Spinner from "../../common/Spinner";

export class ProfileSneakers extends Component {
  componentDidMount() {
    const { profile } = this.props.profile;

    const profileUserId = profile.user._id;

    console.log(profileUserId);

    this.props.getSneakersByUser(profileUserId);
  }

  render() {
    const { profile } = this.props.profile;
    const { sneakers, loading } = this.props.sneaker;

    const firstName = profile.user.name.trim().split(" ")[0];

    let sneakerContent;

    if (sneakers === null || loading) {
      sneakerContent = <Spinner />;
    } else {
      sneakerContent = <SneakerFeed sneakers={sneakers} />;
    }

    return (
      <div className="profileSneakers">
        <div className="container">
          <div className="row">
            <h3>{firstName}'s Latest Sneakers</h3>
          </div>

          <div className="row">{sneakerContent}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  sneaker: state.sneaker
});

export default connect(
  mapStateToProps,
  { getSneakersByUser }
)(ProfileSneakers);
