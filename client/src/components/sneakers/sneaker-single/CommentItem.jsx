import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/sneakerActions";
import { Link } from "react-router-dom";

const CommentItem = ({ sneakerId, comment, auth, deleteComment }) => {
  return (
    <div className="commentBody">
      <div className="commentAvatar">
        <div className="avatarHolder">
          <img src={comment.avatar} alt="" />
        </div>
        <br />
        <Link to={`/profile/${comment.handle}`}>
          <p className="commentName">{comment.name}</p>
        </Link>
      </div>

      <div className="commentText">
        <p>{comment.text}</p>

        {comment.user === auth.user.id ? (
          <button onClick={() => deleteComment(sneakerId, comment._id)} type="button" className="btn btn-comment-delete btn-danger mr-1">
            <i className="fas fa-times" />
          </button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
