import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  deleteSneaker,
  addLike,
  removeLike
} from "../../../actions/sneakerActions";
import Moment from "react-moment";
import { getCurrentProfile } from "../../../actions/profileActions";
import ReactFancyBox from "react-fancybox";

class SneakerItem extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

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

    if (!profile) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="sneakerMainHead row">

          <div className="sneakerDesc col-md-12">
            <h3>{sneaker.model}</h3>
            <h3>{sneaker.colorway}</h3>
            <h3>{sneaker.year}</h3>
          </div>

          <div className="sneakerMainImage col-md-12">
            {sneaker.mainimage === "" ? (
              "  "
            ) : (
              <a data-fancybox="gallery" href={sneaker.mainimage}>
                <img src={sneaker.mainimage} alt="..." />
              </a>
            )}
          </div>

          <div className="sneakerThumbs col-md-12">

            {sneaker.subimage_1 === "" ? (
              "  "
            ) : (
              <div className="sneakerThumb col-md-3">
                <a data-fancybox="gallery" href={sneaker.subimage_1}>
                  <img src={sneaker.subimage_1} alt="..." />
                </a>
              </div>
            )}

            {sneaker.subimage_2 === "" ? (
              "  "
            ) : (
              <div className="sneakerThumb col-md-3">
                <a data-fancybox="gallery" href={sneaker.subimage_2}>
                  <img src={sneaker.subimage_2} alt="..." />
                </a>
              </div>
            )}

            {sneaker.subimage_3 === "" ? (
              "  "
            ) : (
              <div className="sneakerThumb col-md-3">
                <a data-fancybox="gallery" href={sneaker.subimage_3}>
                  <img src={sneaker.subimage_3} alt="..." />
                </a>
              </div>
            )}

            {sneaker.subimage_4 === "" ? (
              "  "
            ) : (
              <div className="sneakerThumb col-md-3">
                <a data-fancybox="gallery" href={sneaker.subimage_4}>
                  <img src={sneaker.subimage_4} alt="..." />
                </a>
              </div>
            )}

          </div>

        </div>

        <div className="sneakerBody row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-3 col-sm-3 col-3">
                <div className="avatarHolder">
                  <img src={sneaker.user.avatar} alt="" />
                </div>
              </div>

              <div className="sneakerBodyText col-md-9 col-sm-9 col-9">
                <h4>
                  By{" "}
                  <span className="sneakerUserName">{sneaker.user.name}</span>{" "}
                </h4>
                <p>{sneaker.text}</p>
                <h6 className="postDate">
                  Posted <Moment format="MM/DD/YYYY">{sneaker.date}</Moment>{" "}
                </h6>
              </div>
            </div>

            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, sneaker._id)}
                  type="button"
                  className="btn btn-sole mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(sneaker.likes)
                    })}
                  />
                  <span className="badge badge-concord">
                    {sneaker.likes.length}
                  </span>
                </button>

                <button
                  onClick={this.onUnlikeClick.bind(this, sneaker._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link
                  to={`/sneaker/${sneaker._id}`}
                  className="btn btn-info mr-1"
                >
                  Comments
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
                ) : (
                  <p> NO GOOD</p>
                )}
              </span>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SneakerItem.defaultProps = {
  showActions: true
};

SneakerItem.propTypes = {
  deleteSneaker: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
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
  { deleteSneaker, addLike, removeLike, getCurrentProfile }
)(SneakerItem);
