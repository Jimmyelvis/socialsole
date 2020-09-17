import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../../actions/sneakerActions";
import { Link } from "react-router-dom";


class CommentItem extends Component {
  onDeleteClick(sneakerId, commentId) {
    this.props.deleteComment(sneakerId, commentId);
  }

  render() {
    const { comment, sneakerId, auth } = this.props;

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
              <button
                onClick={this.onDeleteClick.bind(this, sneakerId, comment._id)}
                type="button"
                className="btn btn-comment-delete btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}

          </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  sneakerId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
