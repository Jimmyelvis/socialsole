import React, { Component } from 'react'
import { Link } from "react-router-dom";


export class Latestnews extends Component {
  

  render() {
    return (
      <div className="latest-news">
        <div className="secheading">
          <h2 className="heading-2">Latest News</h2>
        </div>

        <div className="news-grid">
          <div className="card-ver-overlay-notrans news-item item-1">
            <Link to="/article/5f2f6d8e387b1f0f45e85ba9">

              <img className="cardbg" src="/assets/img/Air-Jordan-3-Denim-Fire-Red-CZ6431-100-Release-Date-Price-4.jpg" alt="..." />
              <div className="overlay"></div>

              <div className="card-content">
                <h3 className="heading-3">
                  Air Jordan 3 SE Fire Red Denim
                </h3>
                <h4 className="heading-4">Coming Soon</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti repudiandae.</p>
              </div>

            </Link>
          </div>

          <div className="card-ver-overlay-notrans news-item item-2">
            <Link to="/article/5f30281d387b1f0f45e85baf">
              <img
                className="cardbg"
                src="/assets/img/shattered.jpg"
                alt="..."
              />
              <div className="overlay"></div>

              <div className="card-content">
                <h3 className="heading-3">
                  MJ's shattered backboard sneakers up for auction.
                </h3>
                <h4 className="heading-4"> Valued at
                  $850K</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti repudiandae.</p>
              </div>
            
            </Link>
          </div>


          <div className="card-ver-overlay-notrans news-item item-3">
            <Link to="/article/5f2f6e71387b1f0f45e85baa">
              <img
                className="cardbg"
                src="/assets/img/0a5c4b5cfa6d5b8e8da03c852fb26d2d.jpg"
                alt="..."
              />
              <div className="overlay"></div>

              <div className="card-content">
                <h3 className="heading-3">
                  This can make your white sneakers look brand new?
                </h3>
                <h4 className="heading-4">Sub Headline</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti repudiandae.</p>
              </div>
            </Link>
          </div>


          <div className="card-ver-overlay-notrans news-item item-4">
            <Link to="/article/5f2f7031387b1f0f45e85bab">
              <img
                className="cardbg"
                src="/assets/img/grateful-dead-nike.jpg"
                alt="..."
              />
              <div className="overlay"></div>

              <div className="card-content">
                <h3 className="heading-3">
                  Grateful Dead, Nike team up on psychedelic sneakers
                </h3>
                <h4 className="heading-4">Sub Headline</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti repudiandae.</p>
              </div>
            </Link>
          </div>

          <div className="card-ver-overlay-notrans news-item item-5">
            <Link to="/article/5f302a70387b1f0f45e85bb0">
              <img
                className="cardbg"
                src="/assets/img/wechatimg2-1.jpg"
                alt="..."
              />
              <div className="overlay"></div>

              <div className="card-content">
                <h3 className="heading-3">How do you wear your sneakers?</h3>
                <h4 className="heading-4">Sub Headline</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti repudiandae.</p>
              </div>
            </Link>
          </div>

          <div className="card-ver-overlay-notrans news-item item-6">
            <Link to="/article/5f302e41387b1f0f45e85bb3">
              <img
                className="cardbg"
                src="/assets/img/vv3slidkvmbq6gwfbq88.webp"
                alt="..."
              />
              <div className="overlay"></div>

              <div className="card-content">
                <h3 className="heading-3">
                  A Guide to This Weekend's Sneaker Releases
                </h3>
                <h4 className="heading-4">Sub Headline</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit deleniti repudiandae.</p>
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    );
  }
}

export default Latestnews
