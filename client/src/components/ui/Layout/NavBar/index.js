/*
  Navbar for the front section of the site Home, Articles, etc
  This contains a different set of links than the Community Navbar
*/

import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, logoutUser, registerUser } from "actions/authActions";
import {  getCurrentProfile } from "actions/profileActions";
import TextFieldGroup from "components/ui/Forms/TextFieldGroup";
import Icon from "components/icons/Icon";
import { setAlert } from "actions/alert";
import { Widgetsetting } from "components/common/Cloudinary";
import { FaSearch } from "react-icons/fa";
import { SignedIn } from "./components/SignedIn";
import Modal from "components/ui/Modal";
import { useModal } from "context/modalContext";
import Search from "components/ui/Search";
import { Login } from "components/ui/Login";
import { Register } from "components/ui/Register";
import { MobileMenu } from './components/MobileMenu';

const Navbar = ({ auth, errors, loginUser, logoutUser, registerUser, clearCurrentProfile, setAlert, profile: { profile, loading }, getCurrentProfile }) => {
  const [values, setvalues] = useState({
    checked: false,
    showlogin: false,
    showregister: false,
    name: "",
    email: "",
    password: "",
    avatar: "",
    password: "",
    password2: "",
  });

  const { checked, showlogin, showregister, name, email, avatar, password, password2 } = values;
  const { isModalOpen, openModal, openOverlay, isOverlayOpen, closeModal } = useModal();

  /*
    This will be used to determine what component called the modal
    this will be passed as a prop to the modal component, and the 
    modal context 
  */
  const compOrigin = "navbar";

  const getPathName = () => { 
    // console.log('====================================');
    // console.log('pathname', window.location.pathname);
    // console.log('====================================');
   }

   useEffect(() => {
    getPathName(); // Call the function initially when the component mounts

    // Create a listener to log the pathname when the route changes
    const handleRouteChange = () => {
      getPathName();
    };

    // Add the listener to the "popstate" event
    window.addEventListener('popstate', handleRouteChange);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [window.location.pathname]);



  /**
   * When the user tries to login, we only want to
   * close the modal if the login was successful.
   * If not successful, we want to keep the modal open
   * and display the error message.
   */
  useEffect(() => {
    if (auth.isAuthenticated) {

      if (isModalOpen) {
        closeModal();
      }

    } 

  }, [auth.isAuthenticated])

  /**
   * Piece of state that will be used to determine, what component
   * that wil be rendered in the modal
   */
  const [modalTarget, setModalTarget] = useState(null);

  /**
   * Check what is the target state, then determine
   * what component should be rendered in the modal.
   */
  const checkTarget = () => {
    if (modalTarget === "search_overlay") {
      return <Search />;
    } else if (modalTarget === "login") {
      return <Login onChange={onChange} onLoginSubmit={onLoginSubmit} password={password} email={email} />;
    } else if (modalTarget === "register") {
      return (
        <Register onChange={onChange} onRegisterSubmit={onRegisterSubmit} name={name} email={email} password={password} password2={password2} avatar={avatar} setvalues={setvalues} values={values} />
      );
    }
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };

  /* useState check previous state toggle checked */
  const changechecked = () => {
    setvalues((prevState) => ({
      ...values,
      checked: !prevState.checked,
    }));
  };

  const closeLogin = () => {
    setvalues({
      ...values,
      showlogin: false,
    });
  };

  const closeRegister = () => {
    setvalues({
      ...values,
      showregister: false,
    });
  };

  const onChange = (e) => {

    setvalues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (value) => {
    setvalues({
      ...values,
      text: value,
    });
  };

  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      closeLogin();
      closeRegister();
    }
  }, [auth.isAuthenticated]);

  const onLoginSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    setvalues({
      ...values,
      showlogin: false,
    });

    loginUser(userData);

   
  };

  const onRegisterSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      avatar: avatar,
      password: password,
      password2: password2,
    };

    setvalues({
      ...values,
      showregister: false,
    });

    registerUser(newUser);



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
        <Link to="/articles">Articles</Link>
      </li>
      <li className="nav-item parent">
        Community
        <ul className="submenu">
          <Link to="/allposts">Posts</Link>
          <Link to="/allsneakers">Sneakers</Link>
          <Link to="/profiles">Profiles</Link>
        </ul>
      </li>
      <li className="nav-item">
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <FaSearch
          className="icon icon-search"
          onClick={() => {
            openModal(compOrigin), setModalTarget("search_overlay");
          }}
        />
      </li>
      <li>
        <SignedIn user={auth.user} onClick={onLogoutClick} profile={profile} />
      </li>
    </React.Fragment>
  );

  const guestLinks = (
    <React.Fragment>
      <li className="nav-item home">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/articles">Articles</Link>
      </li>
      <li className="nav-item parent">
        Community
        <ul className="submenu">
          <Link to="/allposts">Posts</Link>
          <Link to="/allsneakers">Sneakers</Link>
          <Link to="/profiles">Profiles</Link>
        </ul>
      </li>
      <li
        className="nav-item"
        onClick={() => {
          openModal(compOrigin), setModalTarget("login");
        }}
      >
        Login
      </li>
      <li
        className="nav-item"
        onClick={() => {
          openModal(compOrigin), setModalTarget("register");
        }}
      >
        Sign Up
      </li>
      <li>
        <FaSearch
          className="icon icon-search"
          onClick={() => {
            openModal(compOrigin), setModalTarget("search_overlay");
          }}
        />
      </li>
    </React.Fragment>
  );

  return (
    <div className={location.pathname == "/" ? "navbar" : "navbar nav-wht-bg"}>

      <MobileMenu
        authLinks={authLinks}
        guestLinks={guestLinks}
        isAuthenticated={isAuthenticated}
        changechecked={changechecked}
        checked={values.checked}
        user={auth.user}
        onClick={onLogoutClick}
        profile={profile}
      />

      {/*
      If isAuthenticated === true, the authLinks items will display
      else the guestlinks items will be displayed
    */}
      <ul className="authGuestlinks">{isAuthenticated ? authLinks : guestLinks}</ul>

      <Modal
        selector={"#modal"}
        overlayColor={`
        ${modalTarget === "search_overlay" ? "rgba(255, 255, 255, 0.95)" : "rgba(0,0,0,0.7)"}`}
        modalTarget={modalTarget}
        modalOrigin={compOrigin}
      >
        {checkTarget()}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
});

export default connect(mapStateToProps, { logoutUser,  loginUser, registerUser, setAlert, getCurrentProfile })(withRouter(Navbar));
