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
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
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
          <Link to="/">HOME</Link>
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
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a Gravatar connected to your email to display an image"
            /> */}
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
        <div className="menu-wrap">
          <input type="checkbox" class="toggler" />

          <div class="hamburger">
            <div> </div>
          </div>

          <div className="menu">
            <div>
              <div>
                <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
              </div>
            </div>
          </div>
        </div>

        {/*
          If isAuthenticated === true, the authLinks items will display
          else the guestlinks items will be displayed
        */}
        <ul className="authGuestlinks">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>

       
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
