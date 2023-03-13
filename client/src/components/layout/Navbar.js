/*
  Navbar for the front section of the site Home, Articles, etc
  This contains a different set of links than the Community Navbar
*/

import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser, registerUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import TextFieldGroup from "../ui/Forms/TextFieldGroup";
import Modal from "../common/Modal"
import Icon from "../icons/Icon"
import { setAlert } from '../../actions/alert';
import { Widgetsetting } from "../common/Cloudinary";
import { FaSearch } from "react-icons/fa";



const Navbar = ({ auth, errors, loginUser, logoutUser, registerUser, clearCurrentProfile, setAlert }) => {

  const [modal, setModal] = useState(false)

  // const [listName, setListName] = useState("");

  //   const handleCreateListInput = (e) => {


  //     setListName(e.target.value);
  //   };

  
    const [values, setvalues] = useState({
      checked : false,
      showlogin: false,
      showregister: false,
      name: "",
      email: "",
      password: "",
      avatar: "",
      password: "",
      password2: "",
  });

  const {checked , showlogin, showregister, name, email, avatar, password, password2} = values

 const onLogoutClick = (e) => {
    e.preventDefault();
    // this.props.clearCurrentProfile();
    logoutUser();
  }


  /* useState check previous state toggle checked */
  const changechecked = () => {
    setvalues(prevState => ({
      ...values,
      checked: !prevState.checked
    }));
  }

  const showLogin = () => {

    setvalues({
      ...values,
      showlogin: true
    })
  }


 const showRegister = () => {
       setvalues({
      ...values,
      showregister: true
    })
}

const closeLogin = () => {
     setvalues({
      ...values,
      showlogin: false
    })
}

const closeRegister = () => {

    setvalues({
      ...values,
      showregister: false
    })

 }

 const onChange = (e) => {
  console.log('e.target.name', e.target.name);
  // console.log('e.target.value', e.target.value);

    setvalues({
      ...values,
      [e.target.name]: e.target.value 
    })
  }


  const handleChange = (value) => {

    setvalues({
      ...values,
      text: value
    })

  }


  useEffect(() => {
    if (auth.isAuthenticated) {
      closeLogin();
      closeRegister();
    }
   
  }, [auth.isAuthenticated])


  const onLoginSubmit = e => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

     setvalues({
       ...values,
       showlogin: false,
     });


    loginUser(userData);
  };

 const onRegisterSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      avatar: avatar,
      password: password,
      password2: password2
    };

    setvalues({ 
      ...values,
      showregister: false,
    })

    registerUser(newUser, history);
  }


  /*
    This function (avatarUploadWidget) uses the cloudinary widget to 
    upload an image to the cloudinary server, if the upload
    is successful it returns a results object. In that object
    we pull out the url to the uploaded image. And set that url 
    in the state. Once all the fields are complete it is then sent
    to the back end with all the other data entered
  */

 const avatarUploadWidget = e => {
  e.preventDefault();


  window.cloudinary.openUploadWidget(
    Widgetsetting(),
    (error, result) => {
      if (result && result.event === "success") {

        setvalues({
          ...values,
          avatar: result.info.url
        })
      }
    }
  );
};

 
/*
Use destructuring to pull out the isAuthenticated, user props 
from the auth state. Depending on whether isAuthenticated is
true or false nav items will change accordingly
*/
const { isAuthenticated } = auth;


const authLinks = (
  <React.Fragment>
    <li className="nav-item home">
      <Link to="/">Home</Link>
    </li>
    <li className="nav-item">
      <Link to="/allarticles">Articles</Link>
    </li>
    <li className="nav-item">
      Community
    </li>
    <li className="nav-item">
      <Link to="/dashboard">Dashboard</Link>
    </li>
    <li>
      <div className="icon icon-search">
        <FaSearch />
      </div>
    </li>

    <li className="nav-item">
      <a
        // href=""
        onClick={onLogoutClick}
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
      <Link to="/community">Community</Link>
    </li>
    <li className="nav-item">
      <Link to="/allposts">User Posts</Link>
    </li>
    <li className="nav-item">
      <Link to="/allsneakers">User Sneakers</Link>
    </li>
    <li className="nav-item">
      <Link to="/profiles">User Profiles</Link>
    </li>
    <li className="nav-item" onClick={showRegister}>
      Sign Up
    </li>
    <li className="nav-item"  onClick={showLogin}>
      Login
    </li>
  </React.Fragment>
);


return (
  <div
    className={
      location.pathname == "/" ? "LandingNavig" : "navig"
    }
  >
    <div className="menu-wrap">
      
      <input type="checkbox" className="toggler" autocomplete="off" onClick={() => changechecked()}/>

      <div className="hamburger">
        <div> </div>
      </div>

      <div className={ checked === true ? "menu menu-shown" : "menu"}>
            <ul className={ checked === true ? "mobileLinkshown" : "mobileLinkshide"}>{isAuthenticated ? authLinks : guestLinks}</ul>
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
      showlogin={showlogin}
      closemodal={closeLogin}
      image="/assets/img/pexels-photo-2474507@2x.jpg"
      modalbody="loginbody"
    >

      <div className="left">
      </div>

      <div className="right">
        <div className="icon-close" onClick={closeLogin}>
          <Icon color="#87caf7" icon="cross" />
        </div>


        <h2 className="heading-2">Welcome</h2>
        <p>Sign in to your  account</p>

        <form className="form-group" onSubmit={onLoginSubmit}>

            <TextFieldGroup
                 placeholder="Email Address"
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

            <button type="submit" className="btn btn-lightblue btn-submit">
              Login
            </button>

        </form>
       
      </div>

    </Modal>

    <Modal
      showregister={showregister}
      closemodal={closeRegister}
      image="/assets/img/maxredsdefault@2x.jpg"
      modalbody="registarbody"
    >
      <div className="formbg"></div>

      <div className="icon-close" onClick={closeRegister}>
          <Icon color="#87caf7" icon="cross" />
      </div>

      <div className="content">

        <div className="pageheading">
          <h2 className="heading-2">Sign Up</h2>
          <p>Create your SocialSole account</p>
        </div>

        <form noValidate onSubmit={onRegisterSubmit}>
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

            <div className="uploadpreview">
              <h4 className="heading-4">Upload a photo for your avatar</h4>

                <div className="avatarHeaderPreview">
                  {
                    avatar ? <img src={avatar} alt=""/> :
                    ""
                  }
                    
                </div>
            
                <div className="upload-btn">
                  <button
                    id="upload_widget"
                    className="btn btn-lightblue"
                    onClick={avatarUploadWidget}
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


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, loginUser, registerUser, setAlert }
)(withRouter (Navbar));
