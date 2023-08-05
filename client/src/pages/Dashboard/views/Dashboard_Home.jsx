import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount, getFriends } from "actions/profileActions";
import { Dashboardtabs } from "../components/Tabs2";
import { DashboardHeader } from "../components/DashboardHeader";
import { DashboardView } from "../components/DashBoardView";
import Spinner from "components/common/Spinner";

const Dashboard = ({ getCurrentProfile, deleteAccount, getFriends, auth, profile: { profile, loading, friends } }) => {
  /* State Variables */
  const [currentView, setCurrentView] = useState("timeline");
  const { user } = auth;

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {

    if (profile) {
      getFriends();
    }

  }, [profile]);

  const onDeleteClick = (e) => {
    deleteAccount();
  };



  return (
    <div className="dashboard ">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <DashboardHeader profile={profile} loading={loading} user={user} friends={friends}  />

          <Dashboardtabs setCurrentView={(currentView) => setCurrentView(currentView)} />
          <DashboardView currentView={currentView} profile={profile} loading={loading} user={user} />
          
          
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const Dashboard_Home = connect(mapStateToProps, { getCurrentProfile, deleteAccount, getFriends })(Dashboard);
