import React, { Component } from "react";
import isEmpty from "utils/is-empty";

export const ProfileHeader = ({ profile, showAbout, showPosts, showSneakers, showFriends }) => {


  return (
    <div className="userheader contentbody">
      <div className="left">
        <div className="imgholder">
          <img src={profile.user.avatar} alt="" />
        </div>
      </div>

      <div className="right">
        <h2 className="heading-2">{profile.user.name}</h2>

        <p>
          FAV SNEAKER:{" "}
          <span className="favsneaker">{profile.favsneaker}</span>
          {isEmpty(profile.favsneaker) ? null : ""}
        </p>

        {isEmpty(profile.location) ? null : (
          <p>
            LOCATION: <span className="location">{profile.location}</span>
          </p>
        )}

        <div className="socialLinks">
          <p>
            {isEmpty(profile.website) ? null : (
              <a href={`https://` + profile.website} target="_blank">
                <i className="fas fa-globe fa-2x" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <a href={`https://` + profile.social.twitter} target="_blank">
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a href={`https://` + profile.social.facebook} target="_blank">
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a href={`https://` + profile.social.youtube} target="_blank">
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <a href={`https://` + profile.social.instagram} target="_blank">
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </p>
        </div>

      </div>

      <div className="profilenav">
          <li onClick={showAbout}>About</li>
          <li onClick={showPosts}>Posts</li>
          <li onClick={showSneakers}>Sneakers</li>
          {/* <li onClick={showFriends}>Friends</li> */}
        </div>
    </div>
  );

  
}

export default ProfileHeader;
