import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/postActions";

const CommentItem =({ postId, comment, auth, deleteComment }) => {


  return (
    <div className="commentBody">
      <div className="commentAvatar">
        <div className="avatarHolder">
          <img src={comment.avatar} alt="" />
        </div>
        <br />
        <p className="commentName">{comment.name}</p>
      </div>
      <div className="commentText">
        <p>{comment.text}</p>

        {comment.user === auth.user.id ? (
          <button onClick={() => deleteComment(postId, comment._id)} type="button" className="btn btn-comment-delete btn-danger mr-1">
            <i className="fas fa-times" />
          </button>
        ) : null}
      </div>
    </div>
  );

}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
