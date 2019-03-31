import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import LandingNavbar from "../../components/layout/LandingNavbar";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

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
          <div className="featured-articles row">
            <div className="featured-article col-md-4 card ">
              <Link to="/news/concord">
                <img
                  src="/assets/img/concords.jpg"
                  class="card-img"
                  alt="..."
                />
              </Link>
              <div className="card-img-overlay">
                <h5>The 2018 Concords are here</h5>
                <p class="card-text">Did you get your pair?</p>
              </div>
            </div>

            <div className="featured-article col-md-4 card ">
              <Link to="/news/nasa">
                <img src="/assets/img/pg3.jpg" class="card-img" alt="..." />
              </Link>
              <div className="card-img-overlay">
                <h5>
                  Nike Unveils The PG3 With NASA Collaboration
                </h5>
                <p class="card-text">
                  PG kicks off his next signature line with an out-of-this-world
                  design.
                </p>
              </div>
            </div>

            <div className="featured-article col-md-4 card ">
              <Link to="/news/tinker">
                <img src="/assets/img/tinker.jpg" class="card-img" alt="..." />
              </Link>
              <div className="card-img-overlay">
                <h5>
                  Tinker Hatfield’s 30 Greatest Footwear Designs
                </h5>
                <p class="card-text">What are your thoughts?</p>
              </div>
            </div>
          </div>

          <div className="upcoming">
            <h3>UPCOMING RELEASES</h3>

            <div className="upcoming-panel">
              <div className="row">
                <div className="img-side col-md-8">
                  <img src="/assets/img/aj-12.jpg" />
                </div>

                <div className="text-side col-md-4">
                  <div className="upcoming-row upcoming-header">
                    <h4>Air Jordan "Chinese New Year"</h4>
                    <h5>February 5, 2019</h5>
                    <div className="upcoming-header-seperator" />
                  </div>

                  <div className="upcoming-row upcoming-desc">
                    <p>
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                    </p>
                  </div>

                  <Link to="/release/cny" className="btn btn-upcomingPanel">
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            <div className="upcoming-panel">
              <div className="row">
                <div className="img-side col-md-8">
                  <img src="/assets/img/ajnineunc.jpg" />
                </div>

                <div className="text-side col-md-4">
                  <div className="upcoming-row upcoming-header">
                    <h4>
                      Air Jordan 9 “UNC” Revives Classic “Pearl Blue” Colorway
                      From 2002
                    </h4>
                    <h5>February 9, 2019</h5>
                    <div className="upcoming-header-seperator" />
                  </div>

                  <div className="upcoming-row upcoming-desc">
                    <p>
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                    </p>
                  </div>

                  <Link to="/release/ajnine" className="btn btn-upcomingPanel">
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            <div className="upcoming-panel">
              <div className="row">
                <div className="img-side col-md-8">
                  <img src="/assets/img/hot-lava.jpg" />
                </div>

                <div className="text-side col-md-4">
                  <div className="upcoming-row upcoming-header">
                    <h4>Air Jordan 4 Hot Lava </h4>
                    <h5>March 9, 2019</h5>
                    <div className="upcoming-header-seperator" />
                  </div>

                  <div className="upcoming-row upcoming-desc">
                    <p>
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                      Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                    </p>
                  </div>

                  <Link to="/release/lava" className="btn btn-upcomingPanel">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
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
