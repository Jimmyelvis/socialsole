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
                  src="https://blog.dtlr.com/wp-content/uploads/2019/02/JORDAN-4-CITRON-4.jpg"
                  alt=""
                />
              </div>

              <div className="heading">
                <div className="row">
                  <div className="avatar">
                    <div className="avatarImg">
                      <img
                        src="https://images.pexels.com/photos/814052/pexels-photo-814052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
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
                  src="https://cdn.thesolesupplier.co.uk/2019/02/nike-air-jordan-iv-retro-weiss-schwarz-308497-116-mood-1.jpg"
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
                          href="https://cdn.shopify.com/s/files/1/0214/7974/products/Sneaker_Politics_Air_Jordan_4_Hot_Lava_01-2.jpg?v=1550876574"
                        >
                          <img
                            src="https://cdn.shopify.com/s/files/1/0214/7974/products/Sneaker_Politics_Air_Jordan_4_Hot_Lava_01-2.jpg?v=1550876574"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://cdn.thesolesupplier.co.uk/2019/02/Untitled-4.jpg"
                        >
                          <img
                            src="https://cdn.thesolesupplier.co.uk/2019/02/Untitled-4.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://sneakernews.com/wp-content/uploads/2018/12/air-jordan-4-hot-lava-308497-116-1.jpg"
                        >
                          <img
                            src="https://sneakernews.com/wp-content/uploads/2018/12/air-jordan-4-hot-lava-308497-116-1.jpg"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://i2.wp.com/www.cnsmnt.com/wp-content/uploads/2018/12/Air-Jordan-4-Hot-Lava-308497-116-Release-Date-3-768x539.jpg?fit=768%2C539&ssl=1"
                        >
                          <img src="https://i2.wp.com/www.cnsmnt.com/wp-content/uploads/2018/12/Air-Jordan-4-Hot-Lava-308497-116-Release-Date-3-768x539.jpg?fit=768%2C539&ssl=1" />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://i0.wp.com/cdn5.kicksonfire.com/wp-content/uploads/2018/12/Air-Jordan-4-Pale-Citron-3-1-565x372.jpg?resize=525%2C346&ssl=1"
                        >
                          <img
                            src="https://i0.wp.com/cdn5.kicksonfire.com/wp-content/uploads/2018/12/Air-Jordan-4-Pale-Citron-3-1-565x372.jpg?resize=525%2C346&ssl=1"
                            alt=""
                          />
                        </a>
                      </li>
                      <li>
                        <a
                          data-fancybox="gallery"
                          href="https://sneakerbardetroit.com/wp-content/uploads/2018/12/Air-Jordan-4-Hot-Lava-308497-116-Release-Date-4.jpg"
                        >
                          <img src="https://sneakerbardetroit.com/wp-content/uploads/2018/12/Air-Jordan-4-Hot-Lava-308497-116-Release-Date-4.jpg" />
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
