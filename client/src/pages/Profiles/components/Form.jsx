import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import { Button } from "components/ui/buttons";
import { Link } from "react-router-dom";

export const Form = ({ onSubmit, profilephoto, handle, favsneaker, onChange, bio, handleChange, twitter, facebook, youtube, instagram, displaySocialInputs, setdisplaySocialInputs, editProfile, matchUrl, profilephotohandler, socialInputs, title, location }) => {
  return (
    <div className="container">
      <div className="create-edit-body  contentbody">
        <h2 className="heading-2">{title}</h2>

        <h4 className="heading-4">Let's get some information to make your profile stand out</h4>

        <small className="d-block pb-3">* = required fields</small>

        <form onSubmit={onSubmit}>
          <TextFieldGroup placeholder="* Profile Handle" name="handle" value={handle} onChange={onChange} info="A unique handle for your profile URL. Your full name, company name, nickname" />

          <TextFieldGroup placeholder="Location" name="location" value={location} onChange={onChange} info="City or city & state suggested (eg. Boston, MA)" />

          <TextFieldGroup placeholder="Your Favorite Sneaker" name="favsneaker" value={favsneaker} onChange={onChange} info="(eg. Air Jordan 12 Taxi)" />

          <ReactQuill placeholder="Short Bio" name="bio" value={bio} onChange={handleChange} />

          <div className="uploadpreview">
            <h4 className="heading-4">Upload a photo for your profile</h4>

            <div className="profileHeaderPreview">
              <img src={profilephoto} alt="" />
            </div>

            <div className="upload-btn">
              <button id="upload_widget" className="btn btn-lightblue" onClick={profilephotohandler}>
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

          <input type="submit" value="Submit" className="btn btn-lightblue btn-submit" />
        </form>
      </div>
    </div>
  );
};
