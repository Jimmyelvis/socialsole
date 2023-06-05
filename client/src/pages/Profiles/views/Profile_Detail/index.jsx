import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAbout from "./components/ProfileAbout";
import ProfilePosts from "./components/ProfilePosts";
import ProfileSneakers from "./components/ProfileSneakers";
import ProfileFriends from "./components/ProfileFriends";

import Spinner from "components/common/Spinner";
import { getProfileByHandle } from "actions/profileActions";
import { Tabs } from "components/ui/Layout/Tabs/Tabs";

/*
  This component is for displaying the overall Profile detail page. This also
  contains sub components that are responsible for different areas of
  the page. <ProfileAbout /> component which is responsible for displaying
  the user's bio. <ProfilePosts /> for displaying posts that was created by the 
  user.

  <ProfileSneakers /> for displaying sneakers created by the user. 
*/

const Profile = ({ profile: { profile, loading, displayedProfile }, auth, getProfileByHandle, match }) => {


    useEffect(() => {
      if (match.params.handle) {

        getProfileByHandle(match.params.handle);
      }
    }, [ match.params.handle]);

    const { user } = auth;


    let profileContent;
    let profileHeader;

    if (displayedProfile === loading) {
      profileContent = <Spinner />;
    } else {
      profileHeader = (
        <ProfileHeader
          profile={displayedProfile}
        />
      );

      profileContent = (
        <React.Fragment>
          <div className="fullimageheader">
            <img src={displayedProfile.profilephoto} alt="" />
          </div>

          {profileHeader}

          <Tabs>

            <div label="About">
              
              <ProfileAbout profile={displayedProfile} />
            </div>

            <div label="Posts">

              <ProfilePosts displayedProfile={displayedProfile} />
            </div>
            
            <div label="Sneakers">
             
              <ProfileSneakers displayedProfile={displayedProfile} />
            </div>
            <div label="Friends">

              <ProfileFriends displayedProfile={displayedProfile} />
            </div>
          </Tabs>

        </React.Fragment>
      );

   
    }

    return (
      <div className="profile">

        {profileContent}
      </div>
    );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const Profile_Detail =  connect(mapStateToProps, { getProfileByHandle })(Profile);
