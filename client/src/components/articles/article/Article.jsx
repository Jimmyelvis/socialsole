import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../../../components/layout/Navbar";
import { getCurrentArticle } from "../../../actions/articleActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../common/Spinner";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import ArticleItem from "./ArticleItem";
// import { useParams } from "react-router-dom";

/*
  This component is for displaying the overall Article detail page. This also
  contains sub components that are responsible for different areas of
  the page. <PostDetail /> component which is responsible for displaying
  the details of a post such as the headerimage, the title, the author
  details, text body.

  <CommentFeed /> which maps through the comments that are attached to this post and 
  displays them.

  <CommentForm /> which is responsible for displaying and implementing the form
  for posting comments.
*/


const Article = (
  { getCurrentArticle, 
    getCurrentProfile, 
    match, 
    article: { loading, article }, 
    profile: { profile }, 
    auth 
  }
  ) => {
  
  /**
   * State for storing the match.params.id of the current article
   */
  const [currentArticle, setcurrentArticle] = useState(null);

  useEffect(() => {
    if (match.params.id) {
      getCurrentArticle(match.params.id);
    }

    getCurrentProfile();
    setcurrentArticle(match.params.id);
  }, []);


  /**
   * This function will be ran when the user clicks on one of the related articles
   * in the related articles section, which changes the url in the browser and
   * we then compare the url to the currentArticle state, if they are the same
   * if they are not the same then we run the getCurrentArticle function with url as
   * the paremeter and render the new article
   */
  useEffect(() => {
    if (match.params.id !== currentArticle) {
      getCurrentArticle(match.params.id);
      setcurrentArticle(match.params.id);
    }
  }, [match.params.id]);



  const { user } = auth; // Get the user from the auth state


  let articleContent; // intialize the articleContent variable

  /** If the is no article or it is loading show the spinner */
  if (article === null || loading || Object.keys(article).length === 0) {
    articleContent = <Spinner />;
  } 
  
  /** If there is an article then display the article, however if there
   * is no user then don't render the comment form, only the comment feed
   */
  else if (user === null || Object.keys(user).length === 0) {
    articleContent = (
      <React.Fragment>
        <ArticleItem article={article} />

        <div className="container">
          {article.comments.length > 0 ? (
            <div className="commentsarea contentbody">
              <CommentFeed articleId={article._id} comments={article.comments} />
            </div>
          ) : (
            <div className="marginspace"></div>
          )}
        </div>
      </React.Fragment>
    );
  } else {


  /** If there is an article then display the article, however if there
   * is no profile attached to the user then don't render the comment form, only the comment feed
   */
    if (profile === null || Object.keys(profile).length === 0) {
      articleContent = (
        <React.Fragment>
          <ArticleItem article={article} />

          <div className="container">
            {article.comments.length > 0 ? (
              <div className="commentsarea contentbody">
                <CommentFeed articleId={article._id} comments={article.comments} />
              </div>
            ) : (
              <div className="marginspace"></div>
            )}
          </div>
        </React.Fragment>
      );
    } else {
      articleContent = (
        <React.Fragment>
          <ArticleItem article={article} />

          <div className="container">
            <div className="commentsarea contentbody">
              <CommentForm articleId={article._id} handle={profile.handle} />
              <CommentFeed articleId={article._id} comments={article.comments} />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  return (
    <div className="newsItem">
      <Navbar />

      <h3>hey man</h3>

      {articleContent}
    </div>
  );
};

const mapStateToProps = state => ({
  article: state.article,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentArticle, getCurrentProfile }
)(Article);
