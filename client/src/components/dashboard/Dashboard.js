import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Navbar from "../../components/layout/Navbar";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <React.Fragment>
            <div className="userAvatar col-md-5">
              <div className="avatarHolder">
                <img src={user.avatar} alt="" />
              </div>
            </div>

            <div className="dashInfo col-md-7">
              <h2>
                Welcome{" "}
                <span className="name">
                  <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                </span>
              </h2>

              <ProfileActions />

              <div style={{ marginBottom: "60px" }} />
              {/* <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button> */}
            </div>
          </React.Fragment>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <React.Fragment>
            <div className="userAvatar col-md-5">
              <div className="avatarHolder">
                <img src={user.avatar} alt="" />
              </div>
            </div>

            <div className="dashInfo col-md-7">
              <h2>Welcome {user.name}</h2>

              <p>You have not yet setup a profile, please add some info</p>
              <Link
                to="/create-profile"
                className="btn btn-lg btn-create btn-sole"
              >
                Create Profile
              </Link>
            </div>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="dashboard contentBody">
        <Navbar />

        <div className="container">
          <div className="row">{dashboardContent}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
