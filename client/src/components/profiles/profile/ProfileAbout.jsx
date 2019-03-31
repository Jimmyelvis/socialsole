import React, { Component } from "react";
// import PropTypes from "prop-types";
import isEmpty from "../../../validation/is-empty";

export class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <div className="profileAbout contentBody">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <h3>{firstName}'s Bio</h3>
                <p>
                  {isEmpty(profile.bio) ? (
                    <span>{firstName} does not have a bio</span>
                  ) : (
                    <span>{profile.bio}</span>
                  )}
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
