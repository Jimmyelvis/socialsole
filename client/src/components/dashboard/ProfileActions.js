import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    // <!-- Dashboard Actions -->
    <div className="dashboardActions btn-group" role="group">
      <Link to="/edit-profile" className="btn btn-sole">
         Edit Profile
      </Link>
      <Link to="/yourposts" className="btn btn-sole">
        Your Posts
      </Link>
      <Link to="/yoursneakers" className="btn btn-sole">
        Your Sneakers
      </Link>
    </div>
  );
};

export default ProfileActions;
