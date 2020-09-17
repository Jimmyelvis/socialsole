import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    // <!-- Dashboard Actions -->
    <div className="dashboardActions btn-group" role="group">
      <Link to="/edit-profile" className="btn btn-lightblue">
         Edit Profile
      </Link>
      <Link to="/createpost" className="btn btn-lightblue">
        Create Post
      </Link>
      <Link to="/createsneaker" className="btn btn-lightblue">
        Create Sneaker
      </Link>
    </div>
  );
};

export default ProfileActions;
