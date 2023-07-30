import React, { useEffect, useState } from 'react'
import { FriendsCard } from 'components/ui/cards/FriendsCard';
import { getProfileFriends } from 'actions/profileActions';
import { connect } from 'react-redux';
import Spinner from "components/common/Spinner";


const ProfileFriends = ({ 
  displayedProfile ,
  getProfileFriends,
  profile : { profile, friends, loading }
}) => {


  useEffect(() => {
    if (displayedProfile) {
      getProfileFriends(displayedProfile);
    }
  }, [displayedProfile]);

  let friendsContent;

  if (friends === null || loading) {
    friendsContent = <Spinner />;
  } else {
    friendsContent = (
      <React.Fragment>
        {friends.map(friend => {
          return (
            <FriendsCard
              name={friend.user?.name}
              avatar={friend.user?.avatar}
              profileHeader={friend.profilephoto}
              city={friend.location}
              socials={friend.social}
              id={friend._id}
              handle={friend.handle}
            />
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="profile-friends">
     
        {friendsContent}
      
    </div>
  )

  
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect( mapStateToProps, { getProfileFriends}) (ProfileFriends)