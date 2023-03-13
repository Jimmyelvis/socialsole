import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "actions/profileActions";
import { Dashboardtabs } from "../components/Tabs2";
import { DashboardHeader } from "../components/DashboardHeader";
import { Panel } from "components/ui/Panel";
import { faker } from '@faker-js/faker';


const Dashboard = ({ getCurrentProfile, deleteAccount, auth, profile: { profile, loading } }) => {

  /* State Variables */
  const [currentView, setCurrentView] = useState("time line")
  const { user } = auth;



  const onDeleteClick = (e) => {
    deleteAccount();
  };

  const createFollowers = () => {

    let followers = [];
    
    for (let index = 0; index < 30; index++) {
      followers.push({
        name: faker.name.firstName(),
        avatar: faker.image.avatar(),
        handle: faker.internet.userName(),  
        email: faker.internet.email(),
      });
      
    }

    return followers;
  }

 
  return (
    <div className="dashboard ">
      <DashboardHeader
        profile={profile}
        loading={loading}
        user={user}
        followers={createFollowers()}
      />

      <Dashboardtabs />
      
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const Dashboard_Home = connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
