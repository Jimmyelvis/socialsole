/*
  Nav bar for the every page but the homepage to give the nav 
  background a blue gradient look
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }


  /*
    Opens the slide out side navigation
    Also takes into account the size of the window pos 
    and adjusts the width of the side menu accordingly 
  */
  openSlideMenu(e) {
    e.preventDefault();

    let w = window.innerWidth;  

    if (w >= 990) {
       document.getElementById("side-menu").style.width = "33%";
      
    }else if ( w >= 768){
        document.getElementById("side-menu").style.width = "50%";
    }else{
      document.getElementById("side-menu").style.width = "100%";
    }

  }

  /*
    Closes the slide out side navigation
  */
  closeSlideMenu(e) {
    e.preventDefault();
    console.log("clicked");
    document.getElementById("side-menu").style.width = "0";
  }

  render() {

  /*
    Use destructuring to pull out the isAuthenticated, user props 
    from the auth state. Depending on whether isAuthenticated is
    true or false nav items will change accordingly
  */
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <li className="nav-item home">
          <Link to="/">
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/allposts">User Posts</Link>
        </li>
        <li className="nav-item">
          <Link to="/profiles">User Profiles</Link>
        </li>
        <li className="nav-item">
          <Link to="/allsneakers">User Sneakers</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <li className="nav-item home">
          <Link to="/">
            HOME
          </Link>
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
        <li className="nav-item">
          <Link to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
      </React.Fragment>
    );

    return (
      <div className="navig">

        <span className="open-slide">
          <a href="#" onClick={this.openSlideMenu}>
            <img
              className="hambuger-icon"
              src="/assets/img/hamburger-icon.png"
              alt=""
            />
          </a>
        </span>


       { /*
          If isAuthenticated === true, the authLinks items will display
          else the guestlinks items will be displayed
        */}
        <ul className="authGuestlinks">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>

        <div id="side-menu" class="side-nav">
          <a href="#" className="btn-close" onClick={this.closeSlideMenu}>
            &times;
          </a>

          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
