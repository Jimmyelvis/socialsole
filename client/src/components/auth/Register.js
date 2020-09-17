import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Navbar from '../../components/layout/Navbar';
import { setAlert } from '../../actions/alert';


class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      avatar: "",
      password: "",
      password2: "",
      errors: {}
    };

  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange =  e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();

    if (this.state.password !== this.state.password2) {
      console.log('====================================');
      console.log('nope');
      console.log('====================================');
      this.props.setAlert('Passwords do not match', 'danger');
    } else {
      console.log('====================================');
      console.log('yeah man');
      console.log('====================================');
    }

    // const newUser = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   avatar: this.state.avatar,
    //   password: this.state.password,
    //   password2: this.state.password2
    // };

    // this.props.registerUser(newUser, this.props.history);
  }

  /*
    Cloudinary widget for user uploads
  */

  avatarUploadWidget = e => {
    e.preventDefault();

    /* Sets a init variable, that will receive upload link address
      which is then passed on to this.state.avatar
    */
    let avatar;

    const cloudname = "dwgjvssdt";  // your cloud name goes here
     const uploadpresent = "ndilj3e8"; // your cloud upload present goes here

    window.cloudinary.openUploadWidget(
      {
        cloudName: cloudname,
        uploadPreset: uploadpresent,
        sources: [
          "local",
        ],
        googleApiKey: "<image_search_google_api_key>",
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#359DFF",
            sourceBg: "#FFFFFF",
            windowBorder: "#9572CC",
            tabIcon: "#034398",
            inactiveTabIcon: "#B2BED6",
            menuIcons: "#034398",
            link: "#8261B5",
            action: "#5333FF",
            inProgress: "#8261B5",
            complete: "#048A53",
            error: "#cc3333",
            textDark: "#034398",
            textLight: "#ffffff"
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true
            }
          }
        }
      },
      (error, result) => {
        if (result && result.event === "success") {
          avatar = result.info.url;

          this.setState({
            avatar: avatar
          });
        }
      }
    );
  };

  render() {

    const { errors } = this.state;

    return (
      <div className="register contentbody">
      <Navbar />

        <div className="container">
          <div className="row">
            <div className="regForm col-md-8 m-auto">
              <h1>Sign Up</h1>
              <p>
                Create your SocialSole account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />

                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />

                <div className="avatarHeader">
                  <h5>Upload a photo for your avatar</h5>

                  <div className="row">
                    <div className="col-md-4">
                      <button
                        id="upload_widget"
                        className="btn btn-sole"
                        onClick={this.avatarUploadWidget}
                      >
                        Upload files
                      </button>
                    </div>

                    <div className="avatarHeaderPreview col-md-8">
                    <img src={this.state.avatar} alt=""/>

                    </div>
                  </div>
                </div>

                <input type="submit" className="btn btn-sole btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, setAlert }
)(withRouter(Register));
