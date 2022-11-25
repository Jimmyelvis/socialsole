import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../../validation/is-empty";

const ProfileItem = ({ profile }) => {


    return (
      <div className="userheader profilecard contentbody">

        <div className="left">
          <div className="imgholder">
            <img src={profile.user.avatar} alt="" />
          </div>
        </div>

        <div className="right">
          <h3 className="heading-3">{profile.user.name}</h3>

          <p>
            {isEmpty(profile.favsneaker) ? null : (
              <p>
                Favorite Sneaker :{" "}
                <span className="favSneaker">{profile.favsneaker}</span>{" "}
              </p>
            )}
          </p>

          <p>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>

          <Link to={`/profile/${profile.handle}`} className="btn btn-lightblue">
            View Profile
          </Link>
        </div>

      </div>
    );
  
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
