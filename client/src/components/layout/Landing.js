import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import LandingNavbar from "../../components/layout/LandingNavbar";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import { FeaturedArticles } from "./frontpage-components/FeaturedArticles";
import { LatestReleases } from "./frontpage-components/LatestReleases";

class Landing extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  openSlideMenu(e) {
    e.preventDefault();
    console.log("clicked");
    document.getElementById("side-menu").style.width = "400px";
  }

  closeSlideMenu(e) {
    e.preventDefault();
    console.log("clicked");
    document.getElementById("side-menu").style.width = "0";
  }

  render() {
    return (
      <React.Fragment>
        <div className="landing">
          <LandingNavbar />

          <h1>SOCIAL SOLE</h1>
          <p>
            Welcome to Social Sole. A exciting site where you can read about the
            latest news concerning, sneakers. And post about and share your
            sneaker collection.
          </p>

          <ul className="socialLinks">
            <li>
              <a href="#">
                <img src="/assets/img/icon-facebook.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/img/icon-twitter.png" alt="" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/img/icon-youtube.png" alt="" />
              </a>
            </li>
            <li>
              <a href="">
                <img src="/assets/img/icon-instagram.png" alt="" />
              </a>
            </li>
          </ul>
        </div>

        <div className="container">

          <FeaturedArticles />

          <LatestReleases />

          
        </div>
        {/* container */}
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
