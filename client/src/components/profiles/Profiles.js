import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileFeed from "./ProfileFeed";
import { getProfiles } from "../../actions/profileActions";
import Navbar from "../../components/layout/Navbar";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  
  render() {

    const { profiles, loading } = this.props.profile;
    let profileItems;


    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      profileItems = <ProfileFeed profiles={profiles} />
    }

    return (
      <div className="profiles">
        <Navbar />

        <div className="container">

          <div className="row">
              <div className="heading">
                <h1>Profiles</h1>
                <p>Browse and connect with sneaker lovers</p>
              </div>
          </div>

          <div className="theprofiles">
              {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
