import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "actions/profileActions";
import InputGroup from "components/ui/Forms/InputGroup";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "components/common/Cloudinary";
import { Form } from "../components/Form";
import isEmpty from "validation/is-empty";

const EditProfile = ({ getCurrentProfile, createProfile, history, profile: { profile, loading } }) => {
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

    createProfile(profileData, history, true);
  };

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
        instagram: !isEmpty(profile.social.instagram) ? profile.social.instagram : "",
      });
    }
  }, [loading]);

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
  }

  console.log('====================================');
  console.log('location', location);
  console.log('====================================');

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
        title="Edit Profile"
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export const Edit_Profile = connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
