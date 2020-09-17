import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

export class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="contentbody">

        <div className="row">

          <div className="userAvatar col-5">
             <div className="avatarHolder">
               <img src={profile.user.avatar} alt=""/>
              </div>
          </div>

          <div className="dashInfo col-md-6">
            <h3>{profile.user.name}</h3>

            <p>
              {isEmpty(profile.favsneaker) ? null : (
                <p>Favorite Sneaker : <span className="favSneaker">{profile.favsneaker}</span> </p>
              )}
            </p>
          
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>

            <Link to={`/profile/${profile.handle}`} className="btn btn-sole">
              View Profile
            </Link>
          </div>

       
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
