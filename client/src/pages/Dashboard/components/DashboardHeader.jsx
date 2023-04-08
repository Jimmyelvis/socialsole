import React, { useState, useEffect } from "react";
import { Panel } from "components/ui/Panel"
import { Avatar } from "components/ui/avatar";
import Spinner from "components/common/Spinner";
import { Link } from "react-router-dom";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import { FollowersModal } from "./FollowersModal";





export const DashboardHeader = ({ 
  profile,
  loading,
  user,
  friends,
}) => {

  let dashboardHeader;

  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();

  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);

  const compOrigin = "dashboard-header";


  const getFollowersAvatars = () => {

   let displayedFollowers = friends.slice(0, 5); 


   return displayedFollowers.map((follower, index) => {
      return (
        <div className={`follower follower-${index}`} key={follower._id}>
          <Avatar avatar={follower.user.avatar} />
        </div>
      )
    })
  }

  const getMoreFollowers = () => {

    let theRest = friends.slice(5, friends.length);

    let andMore = theRest.length > 0 ? theRest.length : null;

    let moreFollowers = theRest.map((follower, index) => {
      return (
        <div className={`follower`} key={follower.email}>
          <Avatar avatar={follower.user.avatar} />

          <h3 className="heading-3">
            {follower.name}
          </h3>
        </div>
      )
    })

    return {
      andMore,
      moreFollowers
    }
    
  }

  const openFollowersModal = () => {
    openModal(compOrigin);
    setModalTarget("followers_overlay");
    console.log("open modal");
   }

  // useEffect(() => {
  //   // console.log(getMoreFollowers().moreFollowers);
  // }, [])

    /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
    const checkTarget = () => {
      if (modalTarget === "followers_overlay") {
        return  <FollowersModal followers={friends} />;
      } 

    };
  


  if (profile === null || loading) {
    dashboardHeader = <Spinner />;
  } else {
    // Check if logged in user has profile data
    if (Object.keys(profile).length > 0) {
      dashboardHeader = (
        <React.Fragment>
          <div className="left">
            <Avatar
              avatar={user && user.avatar}
            />
          </div>

          <div className="right">
            <h2 className="heading-2">
              Welcome{" "}
              <Link to={`/profile/${profile.handle}`} className="profilename">
                {user.name}
              </Link>
            </h2>

            <div className="followers">

              <div className="avatars">
                {getFollowersAvatars()}
              </div>

              <h3 className="heading-3" onClick={() => openFollowersModal()}>
               &  {getMoreFollowers().andMore} more followers
              </h3>

            </div>

          </div>
        </React.Fragment>
      );
    } else {
      // User is logged in but has no profile
      dashboardHeader = (
        <React.Fragment>
          <div className="left">
            <div className="imgholder">
              <img src={user && user.avatar} alt="" />
            </div>
          </div>

          <div className="right">
            <h2 className="heading-2">Welcome {user && user.name}</h2>

            <p>You have not yet setup a profile, why not set one up?</p>
            <Link to="/create-profile" className="btn btn-lightblue">
              Create Profile
            </Link>
          </div>
        </React.Fragment>
      );
    }
  }


  return (
    <>
      <Panel className="dashboard-header">
        {dashboardHeader}
      </Panel>

      <Modal
        selector={"#modal"}
        modalTarget={modalTarget}
        modalOrigin={compOrigin}
      >
        {checkTarget()}
      </Modal>
    
    </>
  )
}
