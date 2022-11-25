import React, { Component } from "react";
import Navbar from "../../layout/Navbar";


export const releases = () => {

  return (
    <div className="newRelease">
      <Navbar />

      <div className="articleitem">
        <div className="fullimageheader">
          <img src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1596943739/nvfewjgwhw1qlgay2too.jpg" alt="" />
        </div>

        <div className="container">
          <div className="userheader authorheader contentbody">
            <div className="left">
              <div className="imgholder">
                <img
                  src="https://res.cloudinary.com/dwgjvssdt/image/upload/v1596941599/si05bxf9rzr2oce3w3th.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="right">
              <h3 className="heading-3">Jen Walsh</h3>
              <h4 className="heading-4">
                Freelance Writer for SocialSole <br />
                <span className="authorEmail">walsh@SocialSole.com</span>
              </h4>
            </div>
          </div>

          <div className="articledetails contentbody">
            <div className="articleImg">
              <img
                src="/assets/img/Air-Jordan-3-Denim-Fire-Red-CZ6431-100-Release-Date-Price-5.jpg"
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
                  href="/assets/img/Air-Jordan-3-Denim-Fire-Red-CZ6431-100-Release-Date-Price-4.jpg">
                  <img
                    src="/assets/img/Air-Jordan-3-Denim-Fire-Red-CZ6431-100-Release-Date-Price-4.jpg"
                    alt=""
                  />
                </a>
              </div>

              <div className="imgholder">
                <a 
                  href="/assets/img/Air-Jordan-3-SE-T-CO.JP-Fire-Red-Denim-2.jpg"
                  data-fancybox="gallery" 
                >
                  <img
                    src="/assets/img/Air-Jordan-3-SE-T-CO.JP-Fire-Red-Denim-2.jpg"
                    alt=""
                  />

                </a>
              </div>

              <div className="imgholder">

                <a 
                  data-fancybox="gallery" 
                  href="/assets/img/Air-Jordan-3-SE-Fire-Red-Denim-3-1.jpg"
                >
                  <img
                    src="/assets/img/Air-Jordan-3-SE-Fire-Red-Denim-3-1.jpg"
                    alt=""
                  />
                </a>
              </div>

              <div className="imgholder">
                <a 
                  href="/assets/img/Air-Jordan-3-SE-Fire-Red-Dbenim-1.jpg"
                  data-fancybox="gallery" 
                >
                  <img
                    src="/assets/img/Air-Jordan-3-SE-Fire-Red-Dbenim-1.jpg"
                    alt=""
                  />
                </a>
              </div>

              <div className="imgholder">
                <a
                  data-fancybox="gallery"  
                  href="/assets/img/Air-Jordan-3-SE-Fire-Red-Denim-1.jpg"
                >
                  <img
                    src="/assets/img/Air-Jordan-3-SE-Fire-Red-Denim-1.jpg"
                    alt=""
                  />
                </a>
              </div>

              <div className="imgholder">
                <a 
                  data-fancybox="gallery"  
                  href="/assets/img/Air-Jordan-3-SE-Fire-Red-Denim.jpg"
                >
                  <img
                    src="/assets/img/Air-Jordan-3-SE-Fire-Red-Denim.jpg"
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

export default releases;
