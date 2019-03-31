import React, { Component } from "react";
import isEmpty from "../../../validation/is-empty";

export class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="profileheader card card-body bg-info text-white mb-3">
            <img className="card-img" src={profile.profilephoto} alt="" />

            <div className="headerInfo row">
              <div className="userAvatar col-md-4">

                <div className="avatarHolder">
                  <img
                    className="rounded-circle"
                    src={profile.user.avatar}
                    alt=""
                  />
                </div>

              </div>

              <div className="dashInfo col-md-8">

                <h2>{profile.user.name}</h2>

                <p>
                  FAV SNEAKER: <span className="profileItems">{profile.favsneaker}</span> 
                  {isEmpty(profile.favsneaker) ? null : (
                    ""
                  )}
                </p>
                {isEmpty(profile.location) ? null : (
                  <p>LOCATION: <span className="profileItems">{profile.location}</span></p>
                )}

                <p>

                  {isEmpty(profile.website) ? null : (
                    <a
                      href={`https://` + profile.website}
                      target="_blank"
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.twitter) ? null : (
                    <a
                      href={`https://` + profile.social.twitter}
                      target="_blank"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.facebook) ? null : (
                    <a
                      href={`https://` + profile.social.facebook}
                      target="_blank"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.youtube) ? null : (
                    <a
                      href={`https://` + profile.social.youtube}
                      target="_blank"
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}

                  {isEmpty(
                    profile.social && profile.social.instagram
                  ) ? null : (
                    <a
                      href={`https://` + profile.social.instagram}
                      target="_blank"
                    >
                      <i className="fab fa-instagram fa-2x" />
                    </a>
                  )}

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
