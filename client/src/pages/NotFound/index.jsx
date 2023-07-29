import React from "react";
import { Panel } from "components/ui/Panel";
import postbtn from "assets/img/404-posts-btn.jpg";
import sneakerbtn from "assets/img/404-sneakers-btn.jpg";
import articlesbtn from "assets/img/404-articles-btn.jpg";
import {Link} from "react-router-dom";


export const NotFound = () => {
  return (
    <div className="container not-found">
      <Panel className="not-found-panel">
        <h2 className="heading-2">This is not the page you’re looking for.</h2>

        <h2 className="heading-2">Unfortunately the page you were looking for can not be found</h2>
        <p>However why not check out some of our content?</p>

        <div className="not-found-panel__btns">
          <Link to="/allposts">
            <div className="not-found-entry">
              <h3 className="heading-3">Our Posts</h3>

              <img src={postbtn} alt="post button" />
            </div>
          </Link>

          <Link to="/allsneakers">
            <div className="not-found-entry">
              <h3 className="heading-3">Our Sneakers</h3>

              <img src={sneakerbtn} alt="post button" />
            </div>
          </Link>

          <Link to="/articles">
            <div className="not-found-entry">
              <h3 className="heading-3">Our Articles</h3>

              <img src={articlesbtn} alt="post button" />
            </div>
          </Link>
        </div>
      </Panel>
    </div>
  );
};
