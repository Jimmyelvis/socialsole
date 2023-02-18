import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRelatedArticles } from "./../../../actions/articleActions";
import { Link } from "react-router-dom";
import Card from "../../cards/Card";

const RelatedArticles = ({ articleId, getRelatedArticles, tags, article: { articles } }) => {


  useEffect(() => {
    getRelatedArticles(tags);

  }, [tags]);



  /*
    Before we map through the article filter out the currently loaded article 
    from the related articles state
    */
  let related = articles.filter((article) => {
    return article._id !== articleId._id;
  });

  return (
    <React.Fragment>
      <h3 className="heading-3">Related Articles</h3>

      <ul>
        {related.map((article) => {
          return (
            <Link to={`/article/${article._id}`}>
              <div className="card-ver-trad" key={article._id}>
                <div className="top">
                  <img src={article.fullheaderimage} alt="" />
                </div>

                <div className="bottom">
                  <h3 className="heading-3">{article.headline}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </ul>
    </React.Fragment>
  );

  
}

const mapStateToProps = (state) => ({
  article: state.article,
  auth: state.auth,
});

export default connect(mapStateToProps, { getRelatedArticles })(
  RelatedArticles
);
