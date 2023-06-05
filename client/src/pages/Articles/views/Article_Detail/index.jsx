import React, { Component, useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getCurrentArticle, addComment, deleteComment } from "actions/articleActions";
import { getCurrentProfile } from "actions/profileActions";
import Spinner from "components/common/Spinner";
import CommentForm from "components/features/comments/CommentForm";
import CommentItem from "components/features/comments/CommentItem";
import { View } from "./components/view";



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
    auth,
    addComment,
    deleteComment
  }
  ) => {

    /**
     * Variables
     */
    let articleContent; // intialize the articleContent variable
    const { user } = auth; // Get the user from the auth state

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

    /** *
     renderCommentList() is a function that maps through the comments array and returns a CommentItem component for each comment.
     */
    const renderCommentList = () => {
      const { comments } = article;

        if (comments.length > 0) {
          return comments.map((comment) => {
            return (
                <CommentItem 
                  key={comment._id} 
                  comment={comment} 
                  elementId={article._id} 
                  deleteComment={deleteComment} 
                />
              );
          });
        }
    };

    /** If the is no article or it is loading show the spinner */
    if (article === null || loading || Object.keys(article).length === 0) {
      articleContent = <Spinner />;
    } 
    
    else if (user === null || Object.keys(user).length === 0) {

      /** If there is an article then display the article, however if there
       * is no user then don't render the comment form, only the comment feed
       */
      articleContent = (
        <React.Fragment>
          <View article={article} />
     
          {article.comments.length > 0 ? <div className="commentsarea contentbody">{renderCommentList()}</div> : ""}
          
        </React.Fragment>
      );
    } 
    
    else {
      /** If there is an article then display the article, however if there
       * is no profile attached to the user then don't render the comment form, only the comment feed
       */
      if (profile === null || Object.keys(profile).length === 0) {
        articleContent = (
          <React.Fragment>
            <View article={article} />

            {article.comments?.length > 0 ? <div className="commentsarea contentbody">{renderCommentList()}</div> : ""}
          </React.Fragment>
        );
      } else {

      /** If the user is logged in and has a profile, then they can view the article and comment on it. */
        articleContent = (
          <React.Fragment>
            <View article={article} />

            {/* <div className="container">

              <div className="commentsarea postcommentsarea contentbody">
                <CommentForm elementId={article._id} addComment={addComment} />
                {renderCommentList()}
              </div>

            </div> */}
          </React.Fragment>
        );
      }
    }

    return (
      <React.Fragment>
        {articleContent}
      </React.Fragment>
    );
  };

const mapStateToProps = state => ({
  article: state.article,
  profile: state.profile,
  auth: state.auth
});

export const Article_Detail = connect(
  mapStateToProps,
  { getCurrentArticle, getCurrentProfile, addComment, deleteComment  }
)(Article);
