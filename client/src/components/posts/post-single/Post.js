import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import { getPost } from "../../../actions/postActions";
import { getCurrentProfile } from "../../../actions/profileActions";
import PostDetails from "./Post-Details";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Navbar from "../../../components/layout/CommNavbar";

/*
  This component is for displaying the overall Post detail page. This also
  contains sub components that are responsible for different areas of
  the page. <PostDetail /> component which is responsible for displaying
  the details of a post such as the headerimage, the title, the author
  details, text body.

  <CommentFeed /> which maps through the comments that are attached to this post and 
  displays them.

  <CommentForm /> which is responsible for displaying and implementing the form
  for posting comments.
*/

const Post = ({ getPost, getCurrentProfile, post: { post, loading }, auth, profile: { profile }, match }) => {
  
  /**
   * State for storing the match.params.id of the current post
   */
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    getPost(match.params.id);
    getCurrentProfile();
    setCurrentPost(match.params.id);
  }, []);

  useEffect(() => {
    if (currentPost !== match.params.id) {
      getPost(match.params.id);
      setCurrentPost(match.params.id);
    }
  }, [match.params.id]);


  const { user } = auth;

  let postContent;

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } 
  
  else if (user === null || Object.keys(user).length === 0) {
    postContent = (
      <React.Fragment>
        <PostDetails post={post} showActions={false} />

            {
              post.comments.length > 0 ? 
              <div className="commentsarea contentbody">
                <CommentFeed postId={post._id} comments={post.comments} />
              </div>

              : ""
            }

      </React.Fragment>
    );
  } 
  
  else {

    if (profile === null || Object.keys(profile).length === 0) {

      postContent = (
        <React.Fragment>
          <PostDetails post={post} showActions={false} />

            {
              post.comments.length > 0 ? 
              <div className="commentsarea contentbody">
                <CommentFeed postId={post._id} comments={post.comments} />
              </div>

              : ""
            }

      </React.Fragment>
      )
      
    } else {
        postContent = (
          <React.Fragment>
            <PostDetails post={post} showActions={true} />

              <div className="commentsarea postcommentsarea contentbody">
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
              </div>

          </React.Fragment>
        );
    }
  }

  return (
    <React.Fragment>
      <Navbar />

      <div className="container">
         {postContent}
      </div>

    </React.Fragment>
  );
 
}



const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getPost, getCurrentProfile })(Post);
