import React, { Component } from "react";
import Navbar from "../../layout/Navbar";


export class releases extends Component {

  render() {
    return (
      <div className="newRelease">
        <Navbar />

        <div className="articleitem">
          <div className="fullimageheader">
            <img src="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-lateral.jpg" alt="" />
          </div>

          <div className="container">
            <div className="userheader authorheader contentbody">
              <div className="left">
                <div className="imgholder">
                  <img
                    src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1593792924/whx8aqfg9o5vyikr8o2m.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="right">
                <h3 className="heading-3">Dylan Cougar</h3>
                <h4 className="heading-4">
                  Freelance Writer for SocialSole <br />
                  <span className="authorEmail">dylancougar@yahoo.com</span>
                </h4>
              </div>
            </div>

            <div className="articledetails contentbody">
              <div className="articleImg">
                <img
                  src="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-side.jpg"
                  alt=""
                />
                <div className="overlay"></div>
                <h3 className="heading-3">Air Jordan 12 Indigo</h3>
                <h4 className="heading-4">Releasing - 
                  <span className="date"> August 22, 2020</span>
                </h4>
              </div>

              <div id="theText" className="articleText">
                <p>
                  Lorem ipsum dolor amet photo booth messenger bag distillery,
                  VHS raw denim scenester vinyl vice bespoke man braid you
                  probably haven't heard of them. Hell of small batch synth
                  kinfolk XOXO, pork belly try-hard listicle prism disrupt
                  gentrify cold-pressed. Kale chips lo-fi flannel pop-up green
                  juice vexillologist shoreditch mumblecore adaptogen
                  cold-pressed yuccie. Letterpress umami VHS echo park. Affogato
                  hot chicken venmo lomo migas keytar flexitarian.
                </p>

                <p>
                  Pabst palo santo authentic, skateboard succulents migas
                  bicycle rights. Semiotics organic austin adaptogen copper mug
                  deep v whatever cardigan YOLO sriracha vexillologist waistcoat
                  pork belly ramps farm-to-table. Stumptown air plant readymade,
                  cray banjo poutine bespoke health goth affogato lomo activated
                  charcoal marfa fam food truck. Chillwave whatever tumblr, air
                  plant poutine copper mug retro sriracha keytar. Bicycle rights
                  selfies snackwave butcher hell of biodiesel.
                </p>

                <p>
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

              <div className="pictures">

                <div className="imgholder">
                  <a
                    data-fancybox="gallery" 
                    href="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-box.jpg">
                    <img
                      src="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-box.jpg"
                      alt=""
                    />
                  </a>
                </div>

                <div className="imgholder">
                  <a 
                    href="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-heel.jpg"
                    data-fancybox="gallery" 
                  >
                    <img
                      src="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-heel.jpg"
                      alt=""
                    />

                  </a>
                </div>

                <div className="imgholder">

                  <a 
                    data-fancybox="gallery" 
                    href="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-side.jpg"
                  >
                    <img
                      src="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-side.jpg"
                      alt=""
                    />
                  </a>
                </div>

                <div className="imgholder">
                  <a 
                    href="/assets/img/$_57.jpg"
                    data-fancybox="gallery" 
                  >
                    <img
                      src="/assets/img/$_57.jpg"
                      alt=""
                    />
                  </a>
                </div>

                <div className="imgholder">
                  <a
                    data-fancybox="gallery"  
                    href="/assets/img/reebok-question-mid-fz1365-1.jpg"
                  >
                    <img
                      src="/assets/img/reebok-question-mid-fz1365-1.jpg"
                      alt=""
                    />
                  </a>
                </div>

                <div className="imgholder">
                  <a 
                    data-fancybox="gallery"  
                    href="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-lateral.jpg"
                  >
                    <img
                      src="/assets/img/harden-iverson-reebok-question-mid-og-meets-og-lateral.jpg"
                      alt=""
                    />
                  </a>
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
