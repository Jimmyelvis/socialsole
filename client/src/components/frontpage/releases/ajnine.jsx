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
                  src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783272/jo302370-145.jpg"
                  alt=""
                />
              </div>

              <div className="heading">
                <div className="row">
                  <div className="avatar">
                    <div className="avatarImg">
                      <img
                        src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783369/pexels-photo-428333.jpg"
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="authorInfo col-md-7">
                    <h3>Leon Haywood</h3>
                    <h4>
                      Freelance Writer for SocialSole <br/>
                      <span className="authorEmail">@leonhaywood</span>
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
                  src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783290/maxresdefault_1.jpg"
                  alt=""
                />
                <div className="overlay" />
                <h3>Air Jordan 9 “UNC”</h3>
              </div>

              <div className="articleReleaseData">
                <h3>Release Date: February 12, 2019</h3>
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
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783315/Air-Jordan-9-UNC-Pearl-Blue-3-1.png"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783315/Air-Jordan-9-UNC-Pearl-Blue-3-1.png"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783308/Air-Jordan-9-UNC-White-University-Blue-Midnight-Navy.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783308/Air-Jordan-9-UNC-White-University-Blue-Midnight-Navy.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783284/DzFn_k-X4AEwZG0.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783284/DzFn_k-X4AEwZG0.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783303/Air-Jordan-9-UNC-Pearl-Blue.png"
                        >
                          <img src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783303/Air-Jordan-9-UNC-Pearl-Blue.png" />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783296/CBJordanRetro9UnivBlue-2-1_1024x1024.jpg"
                        >
                          <img
                            src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783296/CBJordanRetro9UnivBlue-2-1_1024x1024.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783272/jo302370-145.jpg"
                        >
                          <img src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1569783272/jo302370-145.jpg" />
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
