import React from 'react'

export default () => {
  return (
    <footer className="footer ">

        <div className="top">
            <ul>
              <li><img src="/assets/img/icon-youtube-white.png" alt=""/></li>
              <li><img src="/assets/img/icon-facebook-white.png" alt=""/></li>
              <li><img src="/assets/img/icon-instagram-white.png" alt=""/></li>
              <li><img src="/assets/img/icon-twitter-png" alt=""/></li>
            </ul>
        </div>

        <div className="mid">

            <div className="container">

                <div className="row">
                
                  <div className="fterlogo col-md-3">

                      <img src="/assets/img/logo-circle-filled.png" alt=""/>
                  
                  </div>
                  <div className="userPhotos col-md-6">

                      <div className="row">
                      
                        <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-1661470.jpg" alt=""/>
                        </div>

                         <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-1070360.jpg" alt=""/>
                        </div>

                         <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-1895019.jpg" alt=""/>
                        </div>

                         <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-637076.jpg" alt=""/>
                        </div>

                          <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-1818594.jpg" alt=""/>
                        </div>

                         <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-233315.jpg" alt=""/>
                        </div>

                        
                        <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-829552.jpg" alt=""/>
                        </div>

                          <div className="userPhoto col-md-4 col-sm-3 col-3">
                          <img src="/assets/img/sneakers/pexels-photo-415261.jpg" alt=""/>
                        </div>

                      
                      </div>
                  
                  
                  </div>

                  <div className="quikLinks col-md-3">

                      <ul>
                        <li>HOME</li>
                        <li>PHOTOS</li>
                        <li>CONTACT</li>
                      </ul>
                  
                  </div>
                </div>
            
            </div>

        </div>

        <div className="bottom">
          <h3> Copyright &copy; {new Date().getFullYear()} SOCIALSOLE </h3> 
        
        </div>

    </footer>
  )
}
