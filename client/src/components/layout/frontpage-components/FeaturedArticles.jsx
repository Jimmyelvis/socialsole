import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";


export class FeaturedArticles extends Component {

  render() {
    return (
      <React.Fragment>

        <div className="featured-articles row">
          <div className="featured-article col-md-4 card ">
            <Link to="/news/concord">
              <img src="/assets/img/concords.jpg" class="card-img" alt="..." />
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
              <h5>Nike Unveils The PG3 With NASA Collaboration</h5>
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
              <h5>Tinker Hatfield’s 30 Greatest Footwear Designs</h5>
              <p class="card-text">What are your thoughts?</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FeaturedArticles
