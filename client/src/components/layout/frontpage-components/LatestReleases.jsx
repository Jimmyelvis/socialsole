import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


export class LatestReleases extends Component {

  render() {
    return (
      <React.Fragment>
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
                    Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
                    ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                  </p>
                </div>

                <Link to="article/grape" className="btn btn-upcomingPanel">
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
                    Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
                    ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
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
                    Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
                    ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
                  </p>
                </div>

                <Link to="/release/lava" className="btn btn-upcomingPanel">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LatestReleases
