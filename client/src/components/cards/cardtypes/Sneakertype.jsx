import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deleteSneaker,
  addLike,
  removeLike
} from "../../../actions/sneakerActions";
import Moment from "react-moment";
import Truncate from "react-truncate";
import Icon from "../../icons/Icon"
import iconSet from "../../icons/selection.json";
import { defaultimg } from "../../common/defaultimg";




class SneakerItem extends Component {
  onDeleteClick(id) {
    this.props.deleteSneaker(id);
  }


  render() {
    const { profile } = this.props.profile;
    const { sneaker, auth, showActions } = this.props;

  

    return (
      <div className="card-ver-overlay ">

        <Link to={`/sneaker/${sneaker._id}`}>
            <div className="likes">
              <div className="likescount">
                <p>{sneaker.likes.length}</p>
              </div>
              <div className="thumb">
                <Icon color="#AADDFF" icon="thumb_up" />
              </div>
            </div>


            {
            sneaker.mainimage ? (
              <img src={sneaker.mainimage}  alt="..." className="cardbg" />
                
              ) : (<img src={defaultimg} alt="..." /> )
            }

            <div className="overlay"></div>
            <div className="darkeroverlay"></div>


            <div className="card-content">
                <h3 className="heading-3">
                  {sneaker.model}
                </h3>
                <h4 className="heading-4">
                  {sneaker.colorway}
                </h4>
                <h5 className="heading-5">
                  {sneaker.year}
                </h5>
            </div>

            <div className="back-content">
                <h3 className="heading-3">
                  {sneaker.model}
                </h3>
                <h4 className="heading-4">
                  {sneaker.colorway}
                </h4>
                <h5 className="heading-5">
                  {sneaker.year}
                </h5>
                <p
                  id="theText"
                  className="back-content-text"
                  dangerouslySetInnerHTML={{ __html: sneaker.text }}
                  >
                </p>

            </div>

          </Link>

      </div>
    );
  }
}

SneakerItem.defaultProps = {
  showActions: true
};


const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteSneaker, addLike, removeLike }
)(SneakerItem);
