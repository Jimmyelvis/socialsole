import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import InputGroup from "../../common/InputGroup";
import {
  createProfile,
  getCurrentProfile
} from "../../../actions/profileActions";
import isEmpty from "../../../validation/is-empty";
import Navbar from "../../../components/layout/CommNavbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "../../common/Cloudinary";

const CreateProfile = ({getCurrentProfile, createProfile, history, profile: { profile, loading }}) => {

    const [values, setValues] = useState({
    handle: "",
    location: "",
    favsneaker: "",
    profilephoto: "",
    avatar: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, setdisplaySocialInputs] = useState(false);

  const {  handle, location, favsneaker, profilephoto, avatar, bio, twitter, facebook, youtube, instagram } = values;

 const onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: handle,
      location: location,
      favsneaker: favsneaker,
      profilephoto: profilephoto,
      avatar: avatar,
      bio: bio,
      twitter: twitter,
      facebook: facebook,
      youtube: youtube,
      instagram: instagram
    };

    createProfile(profileData, history, true);
  }



  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    if (!loading && profile) {
      
      setValues({
        ...values,
        handle: !isEmpty(profile.handle) ? profile.handle : "",
        location: !isEmpty(profile.location) ? profile.location : "",
        favsneaker: !isEmpty(profile.favsneaker) ? profile.favsneaker : "",
        profilephoto: !isEmpty(profile.profilephoto) ? profile.profilephoto : "",
        avatar: !isEmpty(profile.avatar) ? profile.avatar : "",
        bio: !isEmpty(profile.bio) ? profile.bio : "",
        twitter: !isEmpty(profile.social.twitter) ? profile.social.twitter : "",
        facebook: !isEmpty(profile.social.facebook) ? profile.social.facebook : "",
        youtube: !isEmpty(profile.social.youtube) ? profile.social.youtube : "",
        instagram: !isEmpty(profile.social.instagram) ? profile.social.instagram : ""
      });
    }
      

  }, [loading]);

 
 

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  const handleChange = (value) => {

    setValues({ ...values, bio: value });
  }

const profilephotohandler = e => {
    e.preventDefault();


    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
          setValues({ ...values, profilephoto: result.info.url });
        }
      }
    );
  };
  
 

  let socialInputs;

  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={onChange}
        />

        <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={onChange}
        />

        <InputGroup
          placeholder="YouTube Channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={onChange}
        />

        <InputGroup
          placeholder="Instagram Page URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Navbar />

      <div className="container">
        
          <div className="create-edit-body  contentbody">

            <h2 className="heading-2">Edit Your Profile</h2>


            <form onSubmit={onSubmit}>
            
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={handle}
                onChange={onChange}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />

              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                info="City or city & state suggested (eg. Boston, MA)"
              />

               <TextFieldGroup
                placeholder="Your Favorite Sneaker"
                name="favsneaker"
                value={favsneaker}
                onChange={onChange}
                info="(eg. Air Jordan 12 Taxi)"
              />

              <ReactQuill
                placeholder="Short Bio"
                name="bio"
                value={bio}
                onChange={handleChange}
              />

       
              <div className="uploadpreview">
                <h4 className="heading-4">Upload a photo for your profile</h4>

                  <div className="profileHeaderPreview">
                    <img src={profilephoto} alt="" />
                  </div>

                  <div className="upload-btn">
                    <button
                      id="upload_widget"
                      className="btn btn-lightblue"
                      onClick={profilephotohandler}
                    >
                      Upload files
                    </button>
                  </div>

              </div>

              <div className="sociallinks">
                <button
                  type="button"
                  onClick={() => {
                      setdisplaySocialInputs((prevState) => !prevState);
                  }}
                  className="btn btn-lightblue btn-sociallinks"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>

              {socialInputs}

              <input
                type="submit"
                value="Submit"
                className="btn btn-lightblue btn-submit"
              />
            </form>
          </div>
      
      </div>
    
    
    </React.Fragment>
  );

  
}


const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
