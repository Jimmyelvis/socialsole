import React, { Component } from 'react'
import { Link } from "react-router-dom";


export class FeaturedArticles extends Component {

  /*
    To get these articles to display properly you will need to edit
    the details below, such as the link address headings and text, and image
     to match the articles you created.
  */

  render() {
    return (
      <React.Fragment>
        <div className="featured-articles ">
          <div className="card-ver-overlay-notrans featured-article">
            <Link to="/article/5f1372cbca2bda8fa1cc9246">
              <img
                className="cardbg"
                src="/assets/img/DCK43xpXoAQwLka.jpg"
                alt="..."
              />
              <div className="overlay"></div>
            </Link>
            <div className="card-content">
              <h3 className="heading-3">Does Resale hurt the consumer?</h3>
              <p>An Indepth Look</p>
            </div>
          </div>

          <div className="card-ver-overlay-notrans  featured-article">
            <Link to="/article/5f2f63b726006e0625abe267">
              <img className="cardbg" src="/assets/img/pg3.jpg" alt="..." />
              <div className="overlay"></div>
            </Link>

            <div className="card-content">
              <h3 className="heading-3">
                Nike Unveils The PG3 With NASA Collaboration
              </h3>
              <p>
                PG kicks off his next signature line with an out-of-this-world
                design.
              </p>
            </div>
          </div>

          <div className="card-ver-overlay-notrans featured-article">
            <Link to="/article/5f2f683326006e0625abe26a">
              <img className="cardbg" src="/assets/img/tinker.jpg" alt="..." />
              <div className="overlay"></div>
            </Link>

            <div className="card-content">
              <h3 className="heading-3">
                Tinker Hatfield’s 30 Greatest Footwear Design
              </h3>
              <p>What are your thoughts?.</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FeaturedArticles
