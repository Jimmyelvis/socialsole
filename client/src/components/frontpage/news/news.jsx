import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "../../layout/Navbar";

export class news extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="newsItem">
        <Navbar />

        <div className="container">
        
          <div className="row">
            <div className="col-md-12">
              <div className="newsHeader card card-body">
                <img
                  className="card-img"
                  src="http://www.flightkickz.cn/images/11s%20concord%202018_11.jpg"
                  alt=""
                />
              </div>

              <div className="heading">
                <div className="row">
                  <div className="avatar col-md-5">
                    <img
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      alt=""
                    />
                  </div>

                  <div className="authorInfo col-md-7">
                    <h3>Tommy Lane</h3>
                    <h4>
                      Freelance Writer for SocialSole
                      <span className="authorEmail">@tommyLane</span>
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
                  src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F12%2Fnikes-2018-air-jordan-11-concord-apparently-largest-sneaker-release-in-history-000.jpg?fit=max&cbr=1&q=90&w=750&h=500"
                  alt=""
                />
              </div>
              <div className="articleText container">
                <p>
                  Lorem ipsum dolor amet photo booth messenger bag distillery,
                  VHS raw denim scenester vinyl vice bespoke man braid you
                  probably haven't heard of them. Hell of small batch synth
                  kinfolk XOXO, pork belly try-hard listicle prism disrupt
                  gentrify cold-pressed. Kale chips lo-fi flannel pop-up green
                  juice vexillologist shoreditch mumblecore adaptogen
                  cold-pressed yuccie. Letterpress umami VHS echo park.
                </p>

                <p>
                  Affogato hot chicken venmo lomo migas keytar flexitarian.
                  Pabst palo santo authentic, skateboard succulents migas
                  bicycle rights. Semiotics organic austin adaptogen copper mug
                  deep v whatever cardigan YOLO sriracha vexillologist waistcoat
                  pork belly ramps farm-to-table. Stumptown air plant readymade,
                  cray banjo poutine bespoke health goth affogato lomo activated
                  charcoal marfa fam food truck. Chillwave whatever tumblr, air
                  plant poutine copper mug retro sriracha keytar.
                </p>

                <p>
                  Bicycle rights selfies snackwave butcher hell of biodiesel.
                  Street art tattooed echo park cronut four loko YOLO neutra
                  enamel pin actually single-origin coffee pug cloud bread.
                  Affogato pabst keffiyeh master cleanse, intelligentsia
                  try-hard butcher authentic paleo 3 wolf moon gentrify.
                  Raclette distillery chillwave, poutine kickstarter vaporware
                  vape chambray marfa beard cornhole. Venmo deep v slow-carb
                  marfa, fixie craft beer sriracha mustache before they sold out
                  fashion axe chicharrones tousled williamsburg hexagon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default news;
