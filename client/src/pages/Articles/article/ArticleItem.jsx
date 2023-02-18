import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import Related from "./RelatedArticles"
import isEmpty from "../../../validation/is-empty";
import Icon from "../../icons/Icon"
import iconSet from "../../icons/selection.json";

/*
  Component for displaying the article detail view 
*/


const ArticleItem  = (
  { article , auth: { isAuthenticated, user } }
  ) => {
  

    const editbtn = (
      <Link to={`/articleedit/${article._id}`} className="editbtn">
          <Icon color="#AADDFF" icon="pencil1" />
      </Link>
    )


    return (
      <React.Fragment>
        <div className="articleitem">
          <div className="fullimageheader">
            <img src={article.fullheaderimage} alt="" />
          </div>

          <div className="container">
            <div className="userheader authorheader contentbody">
              <div className="left">
                <div className="imgholder">
                  <img src={article.user && article.user.avatar} alt="" />
                </div>
              </div>

              <div className="right">
                <h3 className="heading-3">{article.user && article.user.name}</h3>
                <h4 className="heading-4">
                  Writer for SocialSole <br />
                  <span className="authorEmail">{article.user && article.user.email}</span>
                </h4>

                <div className="articleedit">
                  {isAuthenticated && user.id === article.user._id
                    ? editbtn
                    : ""}
                </div>
              </div>
            </div>

            <div className="articledetails contentbody">

                <div className="articleImg">
                  <img src={article.articleheaderimage} alt="" />
                  <div className="overlay"></div>
                  <h3 className="heading-3">{article.headline}</h3>
                </div>

                <div
                    id="theText"
                    className="articleText"
                    dangerouslySetInnerHTML={{ __html: article.text }}
                  ></div>

                <div className="related">
                  {/* <Related tags={article.tags} articleId={article}/> */}
                </div>
              
            </div>



          </div>
        </div>
      </React.Fragment>
    );

}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps) (ArticleItem);

