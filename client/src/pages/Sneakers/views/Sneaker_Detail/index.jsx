import React from 'react'
import { connect } from "react-redux";
import Spinner from "components/common/Spinner";
import { getSneaker } from 'actions/sneakerActions';
import { getCurrentProfile } from "actions/profileActions";
import { View } from "./components/view";
import CommentForm from "components/features/comments/CommentForm";
import { getParams } from "utils/getParams";
import CommentItem from "components/features/comments/CommentItem";
import { deleteComment, addComment } from "actions/sneakerActions";


export const Sneaker = ({ getSneaker, getCurrentProfile, deleteComment, addComment, sneaker: { sneaker, loading }, match, auth, profile: { profile } }) => {
  /*Variables */
  const { user } = auth;
  let sneakerContent;

  getParams(match.params.id, getSneaker, getCurrentProfile);

  /* renderCommentList() is a function that maps through the comments array and returns a CommentItem component for each comment. */

  const renderCommentList = () => {
    const { comments } = sneaker;

    if (comments.length > 0) {
      return comments.map((comment) => {
        return <CommentItem key={comment._id} comment={comment} elementId={sneaker._id} deleteComment={deleteComment} />;
      });
    }
  };

  /** Loading State */
  if (sneaker === null || loading || Object.keys(sneaker).length === 0) {
    sneakerContent = <Spinner />;
  } 
  
  /** If the user is not logged in, then they can only view the post, but not comment on it. */
  else if (user === null || Object.keys(user).length === 0) {
    sneakerContent = (
      <div>
        <View sneaker={sneaker} showActions={false} />

          {sneaker.comments.length > 0 ? <div className="commentsarea contentbody">
          {renderCommentList()}</div> : ""}
       
      </div>
    );
  } 
  
  else {

    /** If the user is logged in, but does not have a profile, so they can only view the post but not comment */
    if (profile === null || Object.keys(profile).length === 0) {
      sneakerContent = (
        <React.Fragment>
          <View sneaker={sneaker} showActions={true} />

        {sneaker.comments.length > 0 ? <div className="commentsarea contentbody">
          {renderCommentList()}</div> : ""}
      </React.Fragment>
      );
    } 
    
    else {
      sneakerContent = (
        <React.Fragment>
          <View sneaker={sneaker} showActions={true} />

          <div className="container">
            <div className="commentsarea postView contentbody">
              <CommentForm elementId={sneaker._id} addComment={addComment} />
              {renderCommentList()}

            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  return <React.Fragment>{sneakerContent}</React.Fragment>;
}

const mapStateToProps = (state) => ({
  sneaker: state.sneaker,
  auth: state.auth,
  profile: state.profile,
});

export const Sneaker_Detail = connect(mapStateToProps, { getSneaker, getCurrentProfile, deleteComment, addComment })(Sneaker);