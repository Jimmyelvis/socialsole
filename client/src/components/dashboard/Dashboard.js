import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import CommNavbar from "../layout/CommNavbar";

const Dashboard = ({ 
  getCurrentProfile, 
  deleteAccount, 
  auth, 
  profile: { profile, loading} }
  ) => {

  useEffect(() => {
    getCurrentProfile();
  }, []);


 const onDeleteClick = (e) => {
    deleteAccount();
  }

  const { user } = auth;

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    
    // Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      dashboardContent = (
        <React.Fragment>
          <div className="left">
            <div className="imgholder">
              <img src={user.avatar} alt="" />
            </div>
          </div>

          <div className="right">
            <h2 className="heading-2">
              Welcome  <Link to={`/profile/${profile.handle}`} className="profilename">
                  {user.name}
                </Link>
            </h2>

            <ProfileActions />
           
          </div>
        </React.Fragment>
      );
    } else {
      // User is logged in but has no profile
      dashboardContent = (
        <React.Fragment>
          <div className="left">
            <div className="imgholder">
              <img src={user.avatar} alt="" />
            </div>
          </div>

          <div className="right">
            <h2 className="heading-2">Welcome {user.name}</h2>

            <p>You have not yet setup a profile, why not set  one up?</p>
            <Link
              to="/create-profile"
              className="btn btn-lightblue"
            >
              Create Profile
            </Link>
          </div>
        </React.Fragment>
      );
    }
  }

  return (
    <div className="dashboard ">
      <CommNavbar />

      <div className="container">
        <div className="userheader dashboardbody contentbody">{dashboardContent}</div>
      </div>
    </div>
  );
  
}


const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
