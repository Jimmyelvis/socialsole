import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";  
import { getPost } from "actions/postActions";
import { getCurrentProfile } from "actions/profileActions";
import { View } from "./view";
import CommentForm from "./components/comments/CommentForm";
import CommentFeed from "./components/comments/CommentFeed";
import { getParams } from "utils/getParams";

/*
  This is for displaying the overall Post detail page. This also
  contains sub components that are responsible for different areas of
  the page. <view /> component which is responsible for displaying
  the details of a post such as the headerimage, the title, the author
  details, text body.

  <CommentFeed /> which maps through the comments that are attached to this post and 
  displays them.

  <CommentForm /> which is responsible for displaying and implementing the form
  for posting comments.
*/

export const Post = ({ getPost, getCurrentProfile, post: { post, loading }, auth, profile: { profile }, match }) => {

  /*Variables */
  const { user } = auth;
  let postContent;

  getParams(match.params.id, getPost, getCurrentProfile);

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } 
  
  else if (user === null || Object.keys(user).length === 0) {
    postContent = (
      <React.Fragment>
        <View post={post} showActions={false} />

        {post.comments.length > 0 ? (
          <div className="commentsarea contentbody">
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  } 
  
  else {
    if (profile === null || Object.keys(profile).length === 0) {
      postContent = (
        <React.Fragment>
          <View post={post} showActions={false} />

          {post.comments.length > 0 ? (
            <div className="commentsarea contentbody">
              <CommentFeed postId={post._id} comments={post.comments} />
            </div>
          ) : (
            ""
          )}
        </React.Fragment>
      );
    } 
    
    else {
      postContent = (
        <React.Fragment>
          <View post={post} showActions={true} />

          <div className="commentsarea postcommentsarea contentbody">
            <CommentForm postId={post._id} />
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        </React.Fragment>
      );
    }
  }

  return <div className="container">{postContent}</div>;
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile,
});

export const Post_Single = connect(mapStateToProps, { getPost, getCurrentProfile })(Post);
