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
                  src="https://cdn5.kicksonfire.com/wp-content/uploads/2019/02/Air-Jordan-9-UNC-1.jpg?x65229"
                  alt=""
                />
              </div>

              <div className="heading">
                <div className="row">
                  <div className="avatar">
                    <div className="avatarImg">
                      <img
                        src="https://images.pexels.com/photos/428333/pexels-photo-428333.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
                  src="https://i.ytimg.com/vi/pqYQwHrdVN0/maxresdefault.jpg"
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
                          href="http://kicksdeals.com/wp-content/uploads/2019/02/jordan-9-retro-UNC-2-700x400.jpg"
                        >
                          <img
                            src="http://kicksdeals.com/wp-content/uploads/2019/02/jordan-9-retro-UNC-2-700x400.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://cdn5.kicksonfire.com/wp-content/uploads/2019/02/Air-Jordan-9-UNC-Pearl-Blue-3-1.png?x65229"
                        >
                          <img
                            src="https://cdn5.kicksonfire.com/wp-content/uploads/2019/02/Air-Jordan-9-UNC-Pearl-Blue-3-1.png?x65229"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://2.kixify.com/sites/default/files/imagecache/product_full/product/2019/02/09/p_25615561_139872431_1276286.png"
                        >
                          <img
                            src="https://2.kixify.com/sites/default/files/imagecache/product_full/product/2019/02/09/p_25615561_139872431_1276286.png"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://sneakernews.com/wp-content/uploads/2019/01/air-jordan-9-unc-big-kids-302359-145-2.jpg"
                        >
                          <img src="https://sneakernews.com/wp-content/uploads/2019/01/air-jordan-9-unc-big-kids-302359-145-2.jpg" />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://i2.wp.com/www.nicekicks.com/files/2019/02/air-jordan-9-midnight-navy-1.jpg?fit=1200%2C640&ssl=1"
                        >
                          <img
                            src="https://i2.wp.com/www.nicekicks.com/files/2019/02/air-jordan-9-midnight-navy-1.jpg?fit=1200%2C640&ssl=1"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://ssl.ulximg.com/public/userfiles/2019/02/Air-Jordan-9-UNC-2.jpg"
                        >
                          <img src="https://ssl.ulximg.com/public/userfiles/2019/02/Air-Jordan-9-UNC-2.jpg" />
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
