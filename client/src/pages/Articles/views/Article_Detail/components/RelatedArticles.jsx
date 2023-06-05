import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRelatedArticles } from "actions/articleActions";
import { Link } from "react-router-dom";
import { CardPicOverlay } from "components/ui/cards/CardPicOverlay";

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
      <h3 className="heading-3">You may also like</h3>

      <ul>
        {related.map((article) => {
          return (
            <CardPicOverlay imgBg={article.fullheaderimage}>

              <Link to={`/article/${article._id}`}>
                <div className="related-card" key={article._id}>
                    <h3 className="heading-3">{article.headline}</h3>
                </div>
              </Link>

            </CardPicOverlay>
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
