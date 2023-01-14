import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import TextAreaFieldGroup from "components/ui/Forms/TextAreaFieldGroup";
import InputGroup from "components/ui/Forms/InputGroup";
import { createProfile } from "actions/profileActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";


const CreateProfile = ({ createProfile, history, profile: { profile } }) => {
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

  const { handle, location, favsneaker, profilephoto, avatar, bio, twitter, facebook, youtube, instagram } = values;

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
      instagram: instagram,
    };

    createProfile(profileData, history);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChange = (value) => {
    setValues({ ...values, bio: value });
  };

  const profilephotohandler = (e) => {
    e.preventDefault();

    window.cloudinary.openUploadWidget(Widgetsetting(), (error, result) => {
      if (result && result.event === "success") {
        setValues({ ...values, profilephoto: result.info.url });
      }
    });
  };

  let socialInputs;

  if (displaySocialInputs) {
    socialInputs = (
      <div>
        <InputGroup placeholder="Twitter Profile URL" name="twitter" icon="fab fa-twitter" value={twitter} onChange={onChange} />

        <InputGroup placeholder="Facebook Page URL" name="facebook" icon="fab fa-facebook" value={facebook} onChange={onChange} />

        <InputGroup placeholder="YouTube Channel URL" name="youtube" icon="fab fa-youtube" value={youtube} onChange={onChange} />

        <InputGroup placeholder="Instagram Page URL" name="instagram" icon="fab fa-instagram" value={instagram} onChange={onChange} />
      </div>
    );
  } else {
    socialInputs = null;
  }

  return (
    <React.Fragment>

      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        handleChange={handleChange}
        profilephotohandler={profilephotohandler}
        handle={handle}
        location={location}
        favsneaker={favsneaker}
        profilephoto={profilephoto}
        bio={bio}
        displaySocialInputs={displaySocialInputs}
        setdisplaySocialInputs={setdisplaySocialInputs}
        socialInputs={socialInputs}
        twitter={twitter}
        facebook={facebook}
        youtube={youtube}
        instagram={instagram}
        title="Create Profile"
      />

   
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export const Create_Profile = connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
