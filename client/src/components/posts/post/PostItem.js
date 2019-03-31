import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../../actions/postActions";
import Moment from "react-moment";
import Truncate from "react-truncate";

export class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { profile } = this.props.profile;
    const { post, auth, showActions } = this.props;

    let limit = 25;

    return (
      <div className="card card-body">
        <div className="row">
          <div className="cardHeaderImage col-md-12 ">
            {post.headerimage === "" ? (
              "  "
            ) : (
              <img src={post.headerimage} className="card-img-top" alt="..." />
            )}
          </div>

          <div className="postHeadline col-md-12 ">
            <h3>
              <span className="headlineTitle">{post.headline}</span>
              <span className="commentsCount">
                {post.comments.length} Comments
              </span>
            </h3>
          </div>
        </div>

        <div className="postAuthor row">
          <h6>By {post.user.name}</h6>

          <h6>
            Posted <Moment format="MM/DD/YYYY">{post.date}</Moment>
          </h6>
        </div>

        <div className="row">
          <div className="postText col-md-12">
            <p className="card-text">
            
                {post.text}
            </p>

            {showActions ? (
              <span className="profileActions">
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-concord mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-concord">
                    {post.likes.length}
                  </span>
                </button>

                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-concord mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link to={`/post/${post._id}`} className="btn btn-sole mr-1">
                  Read More
                </Link>

                {post.user._id === auth.user.id ||
                post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
