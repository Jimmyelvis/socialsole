import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
// import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import InputGroup from "../../common/InputGroup";
import { createProfile } from "../../../actions/profileActions";
import Navbar from "../../../components/layout/CommNavbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Widgetsetting } from "../../common/Cloudinary";


class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
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
      errors: {}
    };

  }

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      favsneaker: this.state.favsneaker,
      profilephoto: this.state.profilephoto,
      avatar: this.state.avatar,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (value) => {
    this.setState({ bio: value })
  }

  profilephotohandler = e => {
    e.preventDefault();


    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
          this.setState({
            profilephoto: result.info.url
          });
        }
      }
    );
  };



  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Navbar />

        <div className="container">

            <div className="create-edit-body  contentbody">

              <h2 className="heading-2">Create Your Profile</h2>

              <h4 className="heading-4">Let's get some information to make your profile stand out</h4>

              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />

                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />

                <TextFieldGroup
                  placeholder="Your Favorite Sneaker"
                  name="favsneaker"
                  value={this.state.favsneaker}
                  onChange={this.onChange}
                  error={errors.favsneaker}
                  info="(eg. Air Jordan 12 Taxi)"
                />

                <ReactQuill
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.handleChange}
                  error={errors.text}
                />

          
                <div className="uploadpreview">
                  <h4 className="heading-4">Upload a photo for your profile</h4>

                  <div className="profileHeaderPreview">
                      <img src={this.state.profilephoto} alt="" />
                  </div>

                  
                  <div className="upload-btn">
                    <button
                      id="upload_widget"
                      className="btn btn-lightblue"
                      onClick={this.profilephotohandler}
                    >
                      Upload files
                    </button>
                  </div>
                  
                </div>

                <div className="sociallinks">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
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
}

CreateProfile.propTypes = {
  // profile: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
