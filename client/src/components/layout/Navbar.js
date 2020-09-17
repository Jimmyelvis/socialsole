/*
  Navbar for the front section of the site Home, Articles, etc
  This contains a different set of links than the Community Navbar
*/

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import Modal from "../common/Modal"
import Icon from "../icons/Icon"
import { setAlert } from '../../actions/alert';
import { Widgetsetting } from "../common/Cloudinary";



class Navbar extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      checked : false,
      showlogin: false,
      showregister: false,
      name: "",
      email: "",
      password: "",
      avatar: "",
      password: "",
      password2: "",
      errors: {}
    }

  }
  

  onLogoutClick = (e) => {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  changechecked = () => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }));
  }

  showLogin = () => {
    this.setState (
      {showlogin: true}
    )
  }

  showRegister = () => {
    this.setState (
      {showregister: true}
    )
  }

  closeLogin = () => {
     this.setState ({
      showlogin: false
     })
  }

  closeRegister = () => {
    this.setState ({
     showregister: false
    })
 }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (value) => {
    this.setState({ text: value })
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.closeLogin();
      this.closeRegister();
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onLoginSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    this.props.setAlert('Login Successful', 'success');

  };

  onRegisterSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    this.props.setAlert('You have successfully registered, you can log in', 'success');

  }


  /*
    This function (avatarUploadWidget) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

 avatarUploadWidget = e => {
  e.preventDefault();


  window.cloudinary.openUploadWidget(
    Widgetsetting(),
    (error, result) => {
      if (result && result.event === "success") {

        this.setState({
          avatar: result.info.url

        });
      }
    }
  );
};


 
  render() {
    /*
    Use destructuring to pull out the isAuthenticated, user props 
    from the auth state. Depending on whether isAuthenticated is
    true or false nav items will change accordingly
  */
    const { isAuthenticated } = this.props.auth;
    const { errors } = this.state;

    
    const authLinks = (
      <React.Fragment>
        <li className="nav-item home">
          <Link to="/">HOME</Link>
        </li>
        <li className="nav-item">
          <Link to="/allarticles">Articles</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard">Community</Link>
        </li>
        <li className="nav-item">
          <a
            // href=""
            onClick={this.onLogoutClick}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <li className="nav-item home">
          <Link to="/">HOME</Link>
        </li>
        <li className="nav-item">
          <Link to="/allarticles">Articles</Link>
        </li>
        <li className="nav-item">
          <Link to="/community">Community</Link>
        </li>
        <li className="nav-item" onClick={this.showRegister}>
          Sign Up
        </li>
        <li className="nav-item"  onClick={this.showLogin}>
          Login
        </li>
      </React.Fragment>
    );

    return (
      <div
        className={
          this.props.location.pathname == "/" ? "LandingNavig" : "navig"
        }
      >
        <div className="menu-wrap">
          
          <input type="checkbox" className="toggler" autocomplete="off" onClick={() =>this.changechecked()}/>

          <div className="hamburger">
            <div> </div>
          </div>

          <div className={ this.state.checked === true ? "menu menu-shown" : "menu"}>
                <ul className={ this.state.checked === true ? "mobileLinkshown" : "mobileLinkshide"}>{isAuthenticated ? authLinks : guestLinks}</ul>
          </div>
        </div>

        {/*
          If isAuthenticated === true, the authLinks items will display
          else the guestlinks items will be displayed
        */}
        <ul className="authGuestlinks">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>


        {/*
          Modal for displaying the Login pop up
        */}

        <Modal
          showlogin={this.state.showlogin}
          closemodal={this.closeLogin}
          image="/assets/img/pexels-photo-2474507@2x.jpg"
          modalbody="loginbody"
        >

          <div className="left">
          </div>

          <div className="right">
            <div className="icon-close" onClick={this.closeLogin}>
              <Icon color="#87caf7" icon="cross" />
            </div>


            <h2 className="heading-2">Welcome</h2>
            <p>Sign in to your SocialSole account</p>

            <form className="form-group" onSubmit={this.onLoginSubmit}>

                <TextFieldGroup
                     placeholder="Email Address"
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

                <button type="submit" className="btn btn-lightblue btn-submit">
                  Login
                </button>

            </form>
           
          </div>

        </Modal>

        <Modal
          showregister={this.state.showregister}
          closemodal={this.closeRegister}
          image="/assets/img/maxredsdefault@2x.jpg"
          modalbody="registarbody"
        >
          <div className="formbg"></div>

          <div className="icon-close" onClick={this.closeRegister}>
              <Icon color="#87caf7" icon="cross" />
          </div>

          <div className="content">

            <div className="pageheading">
              <h2 className="heading-2">Sign Up</h2>
              <p>Create your SocialSole account</p>
            </div>

            <form noValidate onSubmit={this.onRegisterSubmit}>
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

                <div className="uploadpreview">
                  <h4 className="heading-4">Upload a photo for your avatar</h4>

                    <div className="avatarHeaderPreview">
                      {
                        this.state.avatar ? <img src={this.state.avatar} alt=""/> :
                        ""
                      }
                        
                    </div>
                
                    <div className="upload-btn">
                      <button
                        id="upload_widget"
                        className="btn btn-lightblue"
                        onClick={this.avatarUploadWidget}
                      >
                        Upload files
                      </button>
                    </div>
                  
                </div>

                <input type="submit" className="btn btn-lightblue btn-submit" />
              </form>

          </div>


        </Modal>
     
     
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, loginUser, registerUser, setAlert }
)(withRouter (Navbar));
