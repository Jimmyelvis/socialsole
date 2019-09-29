import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "../../layout/Navbar";

export class releases extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="newRelease">
        <Navbar />

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="newsHeader card card-body">
                <img
                  className="card-img"
                  src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783574/JORDAN-4-CITRON-4.jpg"
                  alt=""
                />
              </div>

              <div className="heading">
                <div className="row">
                  <div className="avatar">
                    <div className="avatarImg">
                      <img
                        src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783600/pexels-photo-814052.jpg"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="authorInfo col-md-7">
                    <h3>Susie Kerrigan</h3>
                    <h4>
                      Freelance Writer for SocialSole <br />
                      <span className="authorEmail">@susiekerrigan</span>
                    </h4>

                    <ul>
                      <li>
                        <i className="fab fa-facebook fa-2x" />
                      </li>
                      <li>
                        <i className="fab fa-instagram fa-2x" />
                      </li>
                      <li>
                        <i className="fab fa-youtube fa-2x" />
                      </li>
                      <li>
                        <i className="fab fa-twitter fa-2x" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="article contentBody">
              <div className="articleImg">
                <img
                  src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783628/nike-air-jordan-iv-retro-weiss-schwarz-308497-116-mood-1.jpg"
                  alt=""
                />
                <div className="overlay" />
                <h3>Air Jordan 4 Hot Lava</h3>
              </div>

              <div className="articleReleaseData">
                <h3>Release Date: March 12, 2019</h3>
                <h3>Retail Price: $190</h3>
              </div>

              <div className="articleText container">
                <div className="row">
                  <div className="col-md-7">
                    <p>
                      Lorem ipsum dolor amet photo booth messenger bag
                      distillery, VHS raw denim scenester vinyl vice bespoke man
                      braid you probably haven't heard of them. Hell of small
                      batch synth kinfolk XOXO, pork belly try-hard listicle
                      prism disrupt gentrify cold-pressed. Kale chips lo-fi
                      flannel pop-up green juice vexillologist shoreditch
                      mumblecore adaptogen cold-pressed yuccie. Letterpress
                      umami VHS echo park. Affogato hot chicken venmo lomo migas
                      keytar flexitarian. Pabst palo santo authentic, skateboard
                      succulents migas bicycle rights. Semiotics organic austin
                      adaptogen copper mug deep v whatever cardigan YOLO
                      sriracha vexillologist waistcoat pork belly ramps
                      farm-to-table. Stumptown air plant readymade, cray banjo
                      poutine bespoke health goth affogato lomo activated
                      charcoal marfa fam food truck. Chillwave whatever tumblr,
                      air plant poutine copper mug retro sriracha keytar.
                    </p>
                  </div>
                  <div className="photos col-md-4">
                    <ul>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784080/m_5cb0153d26219f7bdc9904f6.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784080/m_5cb0153d26219f7bdc9904f6.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784060/D0SH_AoW0AANhx7.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784060/D0SH_AoW0AANhx7.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784070/nike-air-jordan-4-hot-lava-3.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784070/nike-air-jordan-4-hot-lava-3.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784150/2019-Air-Jordan-4-Hot-Lava-White-Black-Light-Crimson-Pale-Citron-To-Buy.jpg"
                        >
                          <img src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784150/2019-Air-Jordan-4-Hot-Lava-White-Black-Light-Crimson-Pale-Citron-To-Buy.jpg" />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784130/Air-Jordan-4-Hot-Lava-308497-116-Release-Date-2.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784130/Air-Jordan-4-Hot-Lava-308497-116-Release-Date-2.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784090/2019-Air-Jordan-4-Hot-Lava-308497-116-New-Sale.jpg"
                        >
                          <img src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569784090/2019-Air-Jordan-4-Hot-Lava-308497-116-New-Sale.jpg" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default releases;
