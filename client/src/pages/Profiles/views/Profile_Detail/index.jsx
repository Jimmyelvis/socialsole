import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAbout from "./components/ProfileAbout";
import ProfilePosts from "./components/ProfilePosts";
import ProfileSneakers from "./components/ProfileSneakers";
import ProfileFriends from "./components/ProfileFriends";
import Spinner from "components/common/Spinner";
import { getProfileByHandle } from "actions/profileActions";
import { Tabs } from "components/ui/Layout/Tabs/Tabs";

const Profile = ({ profile: { profile, loading, displayedProfile }, auth, getProfileByHandle }) => {
  const { handle } = useParams();

  useEffect(() => {
    if (handle) {
      getProfileByHandle(handle);
    }
  }, [handle]);

  const { user } = auth;

  let profileContent;
  let profileHeader;

  if (displayedProfile === loading) {
    profileContent = <Spinner />;
  } else {
    profileHeader = <ProfileHeader profile={displayedProfile} />;

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

  return <div className="profile">{profileContent}</div>;
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export const Profile_Detail = connect(mapStateToProps, { getProfileByHandle })(Profile);
