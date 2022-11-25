import React, { Component } from 'react'
import CommNavbar from "../../components/layout/CommNavbar";
import Mostliked from "../homepage/frontpage-components/MostLikedSneakers";
import NewestProfiles from "../homepage/frontpage-components/NewestProfiles"

/*
  Landing page for the Community section of the 
  site. This view is only displayed if a user is not
  logged in.
*/

export const Community = () => {
  
  return (
    <React.Fragment>
      <CommNavbar />

      <div className="community">
        <div className="overlay"></div>

        <div className="content">
          <h1 className="heading-1">Sneaker Community</h1>
          <p>
            The Community is here for all Sneakerheads. If you have not yet
            registered, then feel free to register so you can join in the
            discussions, comment on articles, post your sneakers
          </p>
        </div>
      </div>

      <div className="container container-home">

        <NewestProfiles />
        <Mostliked />

        

      </div>

    </React.Fragment>  


  );
 
}

export default Community
