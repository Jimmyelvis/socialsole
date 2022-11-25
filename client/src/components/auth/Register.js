import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Navbar from '../../components/layout/Navbar';
import { setAlert } from '../../actions/alert';
import { Widgetsetting } from "../common/Cloudinary";


const Register = ({ registerUser, auth, errors, history, setAlert }) => {


  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = values;

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth.isAuthenticated]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };

      registerUser(newUser, history);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  

  /*
    Cloudinary widget for user uploads
  */

  const avatarUploadWidget = e => {
    e.preventDefault();

    /* Sets a init variable, that will receive upload link address
      which is then passed on to this.state.avatar
    */
    let avatar;

    const cloudname = "dwgjvssdt";  // your cloud name goes here
    const uploadpresent = "ndilj3e8"; // your cloud upload present goes here

    window.cloudinary.openUploadWidget(
      Widgetsetting(),
      (error, result) => {
        if (result && result.event === "success") {
          avatar = result.info.url;

          // this.setState({
          //   avatar: avatar
          // });
        }
      }
    );
  };

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
            <form noValidate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
              />

              <TextFieldGroup
                placeholder="Email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
              />

              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={password}
                onChange={onChange}
              />

              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={password2}
                onChange={onChange}
              />

              {/* <div className="avatarHeader">
                <h5>Upload a photo for your avatar</h5>

                <div className="row">
                  <div className="col-md-4">
                    <button
                      id="upload_widget"
                      className="btn btn-sole"
                      onClick={avatarUploadWidget}
                    >
                      Upload files
                    </button>
                  </div>

                  <div className="avatarHeaderPreview col-md-8">
                  <img src={avatar} alt=""/>

                  </div>
                </div>
              </div> */}

              <input type="submit" className="btn btn-sole btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );

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
