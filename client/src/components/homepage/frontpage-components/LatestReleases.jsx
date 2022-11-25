import React, { Component } from 'react'
import { Link } from "react-router-dom";


export const LatestReleases = () => {

  return (
    <React.Fragment>
      <div className="latest-releases">
        <div className="secheading">
          <h2 className="heading-2">Latest Releases</h2>
        </div>

        <div className="releases">

          <div className="card-ver-trad contentbody">
            <div className="top">
              <img src="/assets/img/Air-Jordan-12-Indigo-Stone-Blue-130690-404.jpg" alt="..." />
            </div>

            <div className="bottom">
              <h3 className="heading-3">Air Jordan 12 Indigo</h3>

              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tempora nesciunt ea hic nihil.
              </p>

              <div className="btn btn-lightblue">
                <Link to="/release/indigo">
                  Read More
                </Link>
              </div>
            </div>
          </div>

          <div className="card-ver-trad contentbody">
            <div className="top">
              <img src="/assets/img/Air-Jordan-3-Denim-Fire-Red-CZ6431-100-Release-Date-Price-4.jpg" alt="..." />
            </div>

            <div className="bottom">
              <h3 className="heading-3">Air Jordan 3 Fire Red SE</h3>

              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tempora nesciunt ea hic nihil.
              </p>

              <div className="btn btn-lightblue">
                <Link to="/release/firedenim">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          

          
          <div className="card-ver-trad contentbody">
            <div className="top">
              <img src="/assets/img/uii8msstkmnv7m1opjxp.webp" alt="..." />
            </div>

            <div className="bottom">
              <h3 className="heading-3">Reebok Question Mid Iverson X Harden</h3>

              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Tempora nesciunt ea hic nihil.
              </p>

              <div className="btn btn-lightblue">
                <Link to="/release/questionmid">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          


        </div>


      </div>
    </React.Fragment>
  );

}

