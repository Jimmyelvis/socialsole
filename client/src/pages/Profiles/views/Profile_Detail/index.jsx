import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAbout from "./components/ProfileAbout";
import ProfilePosts from "./components/ProfilePosts";
import ProfileSneakers from "./components/ProfileSneakers";
import ProfileFriends from "./components/ProfileFriends";

import Spinner from "components/common/Spinner";
import { getProfileByHandle } from "actions/profileActions";

/*
  This component is for displaying the overall Profile detail page. This also
  contains sub components that are responsible for different areas of
  the page. <ProfileAbout /> component which is responsible for displaying
  the user's bio. <ProfilePosts /> for displaying posts that was created by the 
  user.

  <ProfileSneakers /> for displaying sneakers created by the user. 
*/

const Profile = ({ profile: { profile, loading, displayedProfile }, auth, getProfileByHandle, match }) => {

   const [values, setValues] = useState({
     about: "show",
     posts: "",
     sneakers: "",
     friends: "",
   });

   const { about, posts, sneakers, friends } = values;


    useEffect(() => {
      if (match.params.handle) {

        console.log("match.params.handle: ", match.params.handle);
        getProfileByHandle(match.params.handle);
      }
    }, [ match.params.handle]);

    const { user } = auth;

    let profileContent;
    let profileHeader;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileHeader = (
        <ProfileHeader
          profile={profile}
          showAbout={() =>
            setValues({
              ...values,
              about: "show",
              posts: "",
              sneakers: "",
              friends: "",
            })
          }
          showPosts={() =>
            setValues({
              ...values,
              about: "",
              posts: "show",
              sneakers: "",
              friends: "",
            })
          }
          showSneakers={() =>
            setValues({
              ...values,
              about: "",
              posts: "",
              sneakers: "show",
              friends: "",
            })
          }
          showFriends={() =>
            setValues({
              ...values,
              about: "",
              posts: "",
              sneakers: "",
              friends: "show",
            })
          }
        />
      );

      if (about === "show") {
        profileContent = (
          <React.Fragment>
            <div className="fullimageheader">
              <img src={profile.profilephoto} alt="" />
            </div>

            
              {profileHeader}
              {/* <ProfileAbout profile={profile} /> */}
            
          </React.Fragment>
        );
      } else if (posts === "show") {
        profileContent = (
          <React.Fragment>
            <div className="fullimageheader">
              <img src={profile.profilephoto} alt="" />
            </div>

            
              {profileHeader}
              <ProfilePosts profile={profile} />
            
          </React.Fragment>
        );
      } else if (sneakers === "show") {
        profileContent = (
          <React.Fragment>
            <div className="fullimageheader">
              <img src={profile.profilephoto} alt="" />
            </div>

            
              {profileHeader}
              <ProfileSneakers profile={profile} />
            
          </React.Fragment>
        );
      } else if (friends === "show") {
        profileContent = (
          <React.Fragment>
            <div className="fullimageheader">
              <img src={profile.profilephoto} alt="" />
            </div>

            
              {profileHeader}
              <ProfileFriends />
            
          </React.Fragment>
        );
      }
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
