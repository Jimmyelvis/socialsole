import React, { Component } from "react";
import isEmpty from "utils/is-empty";
import { Panel } from "components/ui/Panel";
import { Avatar } from "components/ui/avatar";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export const ProfileHeader = ({ profile, showAbout, showPosts, showSneakers, showFriends }) => {


  return (
    <Panel className="userheader" frosted>
      <div className="left">
        <Avatar avatar={profile.user?.avatar} />
      </div>

      <div className="middle">
        <h2 className="heading-2">{profile.user?.name}</h2>

        <p>
          Fav Sneaker:
          <span className="favsneaker">{profile.favsneaker}</span>
          {isEmpty(profile.favsneaker) ? null : ""}
        </p>

        {isEmpty(profile.location) ? null : (
          <p>
            Location: <span className="location">{profile.location}</span>
          </p>
        )}
      </div>

      <div className="right">
        <ul className="socialLinks">
          {isEmpty(profile.social && profile.social.twitter) ? null : (
            <a href={`https://` + profile.social.twitter} target="_blank">
              <FaTwitter className="icon icon-list" style={{ fill: `url(#blue-gradient-${profile._id})` }} />

              <svg width="0" height="0">
                <linearGradient id={`blue-gradient-${profile._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#9ED7FF" offset="0%" />
                  <stop stopColor="#3592D4" offset="100%" />
                </linearGradient>
              </svg>

              <span className="label">@ {profile.social.twitter.split("/")[1]}</span>
            </a>
          )}

          {isEmpty(profile.social && profile.social.facebook) ? null : (
            <a href={`https://` + profile.social.facebook} target="_blank">
              <FaFacebook className="icon icon-list" style={{ fill: `url(#blue-gradient-${profile._id})` }} />

              <svg width="0" height="0">
                <linearGradient id={`blue-gradient-${profile._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#9ED7FF" offset="0%" />
                  <stop stopColor="#3592D4" offset="100%" />
                </linearGradient>
              </svg>

              <span className="label">@ {profile.social.facebook.split("/")[1]}</span>
            </a>
          )}

          {isEmpty(profile.social && profile.social.youtube) ? null : (
            <a href={`https://` + profile.social.youtube} target="_blank">
              <FaYoutube className="icon icon-list" style={{ fill: `url(#blue-gradient-${profile._id})` }} />

              <svg width="0" height="0">
                <linearGradient id={`blue-gradient-${profile._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#9ED7FF" offset="0%" />
                  <stop stopColor="#3592D4" offset="100%" />
                </linearGradient>
              </svg>

              <span className="label">@ {profile.social.youtube.split("/")[1]}</span>
            </a>
          )}

          {isEmpty(profile.social && profile.social.instagram) ? null : (
            <a href={`https://` + profile.social.instagram} target="_blank">
              <FaInstagram className="icon icon-list" style={{ fill: `url(#blue-gradient-${profile._id})` }} />

              <svg width="0" height="0">
                <linearGradient id={`blue-gradient-${profile._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#9ED7FF" offset="0%" />
                  <stop stopColor="#3592D4" offset="100%" />
                </linearGradient>
              </svg>

              <span className="label">@ {profile.social.instagram.split("/")[1]}</span>
            </a>
          )}
        </ul>
      </div>

      {/* <div className="profilenav">
          <li onClick={showAbout}>About</li>
          <li onClick={showPosts}>Posts</li>
          <li onClick={showSneakers}>Sneakers</li>
          <li onClick={showFriends}>Friends</li>
      </div> */}
    </Panel>
  );

  
}

export default ProfileHeader;
