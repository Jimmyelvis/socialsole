import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { addLike, removeLike } from "actions/sneakerActions";

export class SneakerItem extends Component {

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

    const { sneaker, auth, showActions } = this.props;


    return (
      <div className="card card-body col-md-3">

        <div className="row">

          <div className="cardHeaderImage col-md-12  ">
            <img
                src={sneaker.mainimage}
                alt=""
              />
          </div>

          <div className="postHeadline col-md-12 ">
            {/* <h3>{sneaker.model}</h3>
            <h4>{sneaker.colorway}</h4> */}

            <h3>{sneaker.model} :  <span className="colorway">{sneaker.colorway}</span> </h3>
          </div>

        </div>

        <div className="row">
         
          <div className="sneakerText col-md-12">
            <p>{sneaker.text}</p>

            {showActions ? (
              <span className="sneakerActions">

                <button
                  onClick={this.onLikeClick.bind(this, sneaker._id)}
                  type="button"
                  className="btn btn-concord mr-1"
                >
                  <i
                    className="text-secondary fas fa-thumbs-up"
                  />
                  <span className="badge badge-concord">{sneaker.likes.length}</span>
                </button>

                <button
                  onClick={this.onUnlikeClick.bind(this, sneaker._id)}
                  type="button"
                  className="btn btn-concord mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link to={`/sneaker/${sneaker._id}`} className="btn btn-sole mr-1">
                  Comments
                </Link>

                {sneaker.user._id === auth.user.id || sneaker.user === auth.user.id ? (
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
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  sneaker: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(SneakerItem);