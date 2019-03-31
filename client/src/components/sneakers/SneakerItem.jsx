import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  deleteSneaker,
  addLike,
  removeLike
} from "../../actions/sneakerActions";
import Moment from "react-moment";
import Truncate from "react-truncate";


class SneakerItem extends Component {
  onDeleteClick(id) {
    this.props.deleteSneaker(id);
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
    const { sneaker, auth, showActions } = this.props;

  

    return (
      <div className="card card-body ">
        <div className="row">
          <div className="cardHeaderImage col-md-12">
            {sneaker.headerimage === "" ? (
              "  "
            ) : (
              <img src={sneaker.mainimage}  alt="..." />
            )}
          </div>

          <div className="sneakerHeadline col-md-12">
            <h4 className="sneakerModel">{sneaker.model}</h4>
            <h4 className="sneakerColorWay">{sneaker.colorway}</h4>
          </div>
        </div>

        <div className="postAuthor row">
          <h6>By {sneaker.user.name}</h6>

          <h6>
            Posted <Moment format="MM/DD/YYYY">{sneaker.date}</Moment>
          </h6>
        </div>

        <div className="row">
          <div className="postText col-md-12">
            <p>
              <Truncate
                  lines={2}
                  ellipsis={
                    <span>
                      ... 
                    </span>
                  }
                >
                  {sneaker.text}
                </Truncate>
            </p>

            {showActions ? (
              <span className="profileActions">
                <button
                  onClick={this.onLikeClick.bind(this, sneaker._id)}
                  type="button"
                  className="btn btn-concord mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-secondary": this.findUserLike(sneaker.likes)
                    })}
                  />
                  <span className="badge badge-concord">
                    {sneaker.likes.length}
                  </span>
                </button>

                <button
                  onClick={this.onUnlikeClick.bind(this, sneaker._id)}
                  type="button"
                  className="btn btn-concord mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link
                  to={`/sneaker/${sneaker._id}`}
                  className="btn btn-sole mr-1"
                >
                  Read More
                </Link>

                {sneaker.user._id === auth.user.id ||
                sneaker.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, sneaker._id)}
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

SneakerItem.defaultProps = {
  showActions: true
};

SneakerItem.propTypes = {
  deleteSneaker: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteSneaker, addLike, removeLike }
)(SneakerItem);
