import React, { useState } from "react";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { getPost } from "actions/postActions";
import { getCurrentProfile } from "actions/profileActions";
import { View } from "./components/view";
import CommentForm from "components/features/comments/CommentForm";
import { getParams } from "utils/getParams";
import CommentItem from "components/features/comments/CommentItem";
import { useParams } from "react-router-dom";




/*
  This is for displaying the overall Post detail page. This also
  contains sub components that are responsible for different areas of
  the page. <view /> component which is responsible for displaying
  the details of a post such as the headerimage, the title, the author
  details, text body.

*/

export const Post = ({ getPost,  getCurrentProfile, post: { post, loading }, auth, profile: { profile }, match }) => {

  /*Variables */
  const { user } = auth;
  let postContent;

  const { id } = useParams();

  getParams(id, getPost, getCurrentProfile);

  /**  renderCommentList() is a function that maps through the comments array and returns a CommentItem component for each comment. */

  const renderCommentList = () => {
    const { comments } = post;

    if (comments && comments.length > 0) {
      return comments.map((comment) => {
        return (
        <CommentItem 
          key={comment._id} 
          comment={comment} 
          elementId={post._id} 
          deleteComment={deleteComment} 
        />
      );
      });
    }
  };

 




  /** Loading State */
  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } 
  
  /** If the user is not logged in, then they can only view the post, but not comment on it. */
  else if (user === null || Object.keys(user).length === 0) {
    postContent = (
      <React.Fragment>
        <View post={post} showActions={false} />

        {/* {post.comments.length > 0 ? <div className="commentsarea contentbody">{renderCommentList()}</div> : ""} */}
      </React.Fragment>
    );
  } 
  
  else {

    /** If the user is logged in, but does not have a profile, so they can only view the post but not comment */
    if (profile === null || Object.keys(profile).length === 0) {
      postContent = (
        <React.Fragment>
          <View post={post} showActions={false} />

          {/* {post.comments.length > 0 ? <div className="commentsarea contentbody">{renderCommentList()}</div> : ""} */}
        </React.Fragment>
      );
    } 
    
    /** If the user is logged in and has a profile, then they can view the post and comment on it. */
    else {
      postContent = (
        <React.Fragment>
          <View post={post} showActions={true} />

           {/* <div className="commentsarea postcommentsarea contentbody">
            <CommentForm elementId={post._id} addComment={addComment} />
            {renderCommentList()}

          </div>  */}
        </React.Fragment>
      );
    }
  }

  return <div className="container">
    
    <div className="post-detail">
      {postContent}
     
    </div>

  </div>;
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export const Post_Single = connect(mapStateToProps, { getPost, getCurrentProfile })(Post);
