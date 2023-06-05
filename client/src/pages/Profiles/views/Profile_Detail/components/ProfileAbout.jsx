import React, { Component } from "react";
import isEmpty from "utils/is-empty";


export const ProfileAbout = ({ profile }) => {

  // Get first name
  const firstName = profile.user?.name.trim().split(" ")[0];

  return (
    <div className="profileAbout contentbody">
       <h3 className="heading-3">{firstName}'s Bio</h3>

        
          {isEmpty(profile.bio) ? (
            <span>{firstName} does not have a bio</span>
          ) : (
            <p
              id="theText"
              dangerouslySetInnerHTML={{ __html: profile.bio }}
            ></p>
          )}
        
    </div>
  );
  
}

export default ProfileAbout;
